export function convertUriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };

    xhr.onerror = function() {
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
