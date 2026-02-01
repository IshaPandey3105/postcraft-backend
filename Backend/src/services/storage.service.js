const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_URL,
});
 
// function to upload file to imagekit
async function uploadFile(buffer){
    const response = await client.files.upload({
      file:buffer.toString("base64"),
      fileName: 'image.jpg',
    });
    return response;
}

module.exports=uploadFile;