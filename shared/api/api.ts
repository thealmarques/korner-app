import * as firebase from "firebase";
import "firebase/firestore";
import { Business } from "../interfaces/business";

export function getMarkers() {
  return firebase.firestore().collection("suggestions").get();
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
    type: data.type
  });
}

export function storeImages(id: string, blob: Blob[]) {
  const ref = firebase.storage().ref("/business-pictures/" + id)
  blob.map(async (value, index) => {
    await ref.child('image_' + index)
      .put(value, {
        contentType: "image/jpeg"
      });
  });
}
