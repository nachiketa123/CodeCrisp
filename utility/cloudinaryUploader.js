
const cloudinary  = require('../config/cloudinary');

const uploadImagesToCloudinary = (imageUrls=[]) =>{
    return new Promise(async (resolve,reject)=>{

        if(imageUrls.length === 0){
            reject('Empty Array of strings was given as input, can not upload')
            return;
        }
        const imageUrlsAfterUpload = [];
        for(let i=0; i<imageUrls.length; ++i){
            try{
                let uploadRes = await cloudinary.uploader.upload(imageUrls[i],{ upload_preset: 'codecrisp_media'})
                imageUrlsAfterUpload.push(uploadRes.url)
            }
            catch(error){
                reject('Error: Something went wrong while uploading images '+error);
                return;
            }
            
        }
        resolve(imageUrlsAfterUpload)   
    })
    
}

module.exports = uploadImagesToCloudinary;