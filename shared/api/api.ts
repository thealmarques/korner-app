import * as firebase from "firebase";
import "firebase/firestore";

export function saveMarker(latitude: string, longitude: string, 
    category: string, subcategory: string, description: string, notifyUpvotes: boolean,
    notifyCreated: boolean, distance: Number, type: string) {
    const db = firebase.firestore();
    return db.collection('suggestions').add({
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