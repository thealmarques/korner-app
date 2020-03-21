import * as firebase from "firebase";
import "firebase/firestore";

export function saveMarker(
  latitude: string,
  longitude: string,
  category: string,
  subcategory: string,
  description: string,
  notifyUpvotes: boolean,
  notifyCreated: boolean,
  distance: Number,
  type: string
): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
  const db = firebase.firestore();
  return db.collection("suggestions").add({
    latitude: latitude,
    longitude: longitude,
    category: category,
    subcategory: subcategory,
    description: description,
    notifyUpvotes: notifyUpvotes,
    notifyCreated: notifyCreated,
    distance: distance,
    type: type
  });
}

export function storeImages(id: string, blob: Blob[]) {
    const ref = firebase.storage().ref("/business-pictures/" + id)
    blob.map(async (value, index) => {
        await ref.child('image_' + index)
        .put(value, {
          contentType: "image/jpeg"
        });
    })
}
