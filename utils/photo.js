import path from "path";
import Jimp from "jimp";
import QRCode from "qrcode-reader";

export function extractPhoto(bot, msg) {
  // Just take any photo size
  const photoSizes = msg.photo;
    console.log(photoSizes);
  const photoSize = photoSizes[photoSizes.length - 1];
  const photoFileID = photoSize.file_id;
  // Get the file and download it
  return bot.getFile(photoFileID).then(file => {
    const downloadDir = path.resolve("photos");
    return bot.downloadFile(file.file_id, downloadDir);
  });
}

export function readQR(fileDir) {
  return Jimp.read(fileDir).then(image => {
    return new Promise(resolve => {
      const qr = new QRCode();
      qr.callback = (err, value) => {
        if (err) {
          console.log(err);
        }
        resolve(value.result);
      };
      qr.decode(image.bitmap);
    });
  });
}
