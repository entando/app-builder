import Canvg from 'canvg';

// eslint-disable-next-line import/prefer-default-export
export const svgToBlob = file => new Promise((resolve, reject) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const convertFromStr = async (svgStr) => {
    const canvg = await Canvg.fromString(ctx, svgStr);
    canvg.start();
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  };

  const convertFromDataUri = async (dataUri) => {
    const blob = await (await fetch(dataUri)).blob();
    resolve(blob);
  };

  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = (evt) => {
    const svgStr = evt.target.result;
    if (svgStr.includes('xlink:href')) {
      const embImgReg = /xlink:href="(data:image[^"]+)"/;
      const embImgDataUri = embImgReg.exec(svgStr)[1];
      convertFromDataUri(embImgDataUri);
      return;
    }
    convertFromStr(svgStr);
  };
  reader.onerror = () => {
    reject(new Error('Error reading svg file'));
  };
});
