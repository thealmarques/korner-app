import * as firebase from "firebase";
import { Business } from "../interfaces/business";
import { sendNotification } from "./notifications";
import { haversineDistance } from "../Helper";
import { User } from "../interfaces/user";
import { Coordinates } from "../interfaces/coordinates";

export function getMyPosts(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
  return firebase.firestore()
    .collection("suggestions").where('creator', '==', firebase.auth().currentUser.uid).get();
}

export function getMyNotifications(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
  return firebase.firestore()
    .collection("notifications").where('id', '==', firebase.auth().currentUser.uid).get();
}

export function bindNotificationToken(token: string, uid: string) {
  firebase.firestore().collection("users").where('user', '==', uid).get().then((query) => {
    firebase.firestore().collection("users")
      .doc(query.docs[0].id).update({
        token,
        user: uid
      });
  }).catch((err) => {
    firebase.firestore().collection("users").add({
      token,
      user: uid
    });
  });
}

export function getMarkers() {
  return firebase.firestore().collection("suggestions").get();
}

export function updateBusinessData(data: Business) {
  firebase.firestore().collection("suggestions").doc(data.id).update(data).then(() => {
    firebase.firestore().collection('users').where('user', '==', data.creator)
      .get().then((query) => {
        let message = '';
        const token = query.docs[0].data().token;
        const upvote = data.upvotes.findIndex((value) => value === firebase.auth().currentUser.uid);
        if (upvote > -1) {
          message = 'Someone liked your post';
        } else {
          message = 'Someone disliked your post';
        }
        registerNotification(data.creator, message, {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude)
        });
        sendNotification([token], message);
      });
  });
}

function registerNotification(id: string, message: string, coordinates: Coordinates) {
  firebase.firestore().collection("notifications").add({
    id,
    message,
    coordinates,
    creationDate: new Date().toDateString()
  });
}

export function getOpenBusinessData(latitude: number, longitude: number) {
  return firebase
    .firestore()
    .collection("suggestions")
    .where("latitude", "==", latitude)
    .where("longitude", "==", longitude)
    .get();
}

export function getBusinessImages(data: Business): Promise<string[]> {
  let hasImage = true;
  let index = 0;
  const imageUrls = [];
  return new Promise(async (resolve, reject) => {
    while (hasImage) {
      await firebase.storage().ref("/business-pictures/" + data.id).child('image_' + index).getDownloadURL()
        .then(async (url) => {
          imageUrls.push(url);
        })
        .catch((error) => {
          hasImage = false;
        });
      index += 1;
    }
    resolve(imageUrls);
  });
}

export function saveMarker(data: Business
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
  const db = firebase.firestore();
  return db.collection("suggestions").add({
    latitude: data.latitude,
    longitude: data.longitude,
    category: data.category,
    subcategory: data.subcategory,
    description: data.description,
    notifyUpvotes: data.notifyUpvotes,
    notifyCreated: data.notifyCreated,
    distance: data.distance,
    schedule: data.schedule,
    type: data.type,
    upvotes: [],
    downvotes: [],
    creator: firebase.auth().currentUser.uid,
    creationDate: new Date().toDateString()
  });
}

export function storeImages(id: string, blob: Blob[]) {
  const ref = firebase.storage().ref("/business-pictures/" + id);
  blob.map(async (value, index) => {
    await ref.child('image_' + index)
      .put(value, {
        contentType: "image/jpeg"
      });
  });
}

export function findNearesBusinessSuggestions(target: Business) {
  getBusinessSuggestions(target.category, target.subcategory).then((vals) => {
    const business = vals[0].data() as Business;
    const distance = haversineDistance({
      latitude: parseFloat(business.latitude),
      longitude: parseFloat(business.longitude)
    },
      {
        latitude: parseFloat(target.latitude),
        longitude: parseFloat(target.longitude)
      });
    if (distance <= (target.distance / 1000)
      && target.id !== business.id) {
      const firestoreRef = firebase.firestore().collection('users')
        .where('user', '==', business.creator);

      if (business.upvotes.length > 0) {
        business.upvotes.map((id) => {
          firestoreRef.where('user', '==', id);
        });
      }

      firestoreRef.get().then((query) => {
        let message = 'A new business that you like has opened.';
        const token = query.docs[0].data().token;
        registerNotification(target.creator, message, {
          latitude: parseFloat(target.latitude),
          longitude: parseFloat(target.longitude)
        });
        sendNotification([token], message);
      });
    }
  });
}

async function getBusinessSuggestions(category: string, subcategory: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection('suggestions').where('category', '==', category)
      .where('subcategory', '==', subcategory)
      .where('type', '==', 'suggest')
      .get().then(documents => {
        if (documents.docs.length > 0) {
          resolve(documents.docs);
        }
      });
  });
}

export function getUserBasicData(): Promise<User> {
  return new Promise(async (resolve, reject) => {
    await firebase.storage().ref("/profile-pictures/").child(firebase.auth().currentUser.uid).getDownloadURL()
      .then(async (url) => {
        resolve({
          name: firebase.auth().currentUser.displayName,
          photoUrl: url
        });
      })
      .catch((error) => {
        console.log(firebase.auth().currentUser);
        resolve({
          name: firebase.auth().currentUser.displayName,
          photoUrl: ""
        });
      })
  });
}

export function logout() {
  firebase.auth().signOut();
}