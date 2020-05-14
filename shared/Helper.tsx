import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export function convertUriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("Blob generator failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
}

export function convertToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(blob);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      resolve(base64data);
    };
  });
}

export async function getLocation() {
  return new Promise(async (resolve) => {
    const response: any = await Permissions.askAsync(Permissions.LOCATION);
    if (response.granted !== "granted" && response.granted) {
      return false;
    }

    var provider = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const coordinates = {
      latitude: provider.coords.latitude,
      longitude: provider.coords.longitude,
    };

    const nameObj = await Location.reverseGeocodeAsync({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    let name = "Select location";
    if (nameObj[0] !== undefined) {
      if (nameObj[0].street === "") {
        name = nameObj[0].city + ", " + nameObj[0].country;
      } else {
        name = nameObj[0].street + ", " + nameObj[0].city;
      }
    }
    resolve({
      coordinates,
      name,
    });
  });
}
