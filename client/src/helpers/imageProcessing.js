export const getImgSource = (project) => {
  const { img } = project;

  if (!img) {
    return "https://imgur.com/Zeuoreq.png";
  }

  var base64Flag = "data:image/jpeg;base64,";

  var imageStr = arrayBufferToBase64(img.data.data);
  return base64Flag + imageStr;
};

export const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};
