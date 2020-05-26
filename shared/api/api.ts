import * as firebase from "firebase";
import { Business } from "../interfaces/business";
import { sendNotification } from "./notifications";

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
              sendNotification([token], message);
            });
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
  console.log(firebase.auth().currentUser.uid);
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
    creator: firebase.auth().currentUser.uid
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
