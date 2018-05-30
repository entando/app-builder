import { isEmpty } from 'lodash';


const b64toBlob = (b64Data, contentType = 'application/octet-stream, application/pkcs12,', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const download = (filename, text) => {
  if (isEmpty(text)) {
    return;
  }
  const data = window.URL.createObjectURL(b64toBlob(text));
  const element = document.createElement('a');

  element.setAttribute('href', data);
  element.setAttribute('download', filename);

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    element.dispatchEvent(event);
  } else {
    element.click();
  }
};


export default download;
