
const cloudinary  = require('../config/cloudinary');

//Utility
const extractPublicIdFromURL = (url) =>{
    const publicId = url.split("/").pop().split(".")[0];
    return publicId;
}


//To upload images to cloudinary
const uploadImagesToCloudinary = (imageUrls=[]) =>{
    return new Promise(async (resolve,reject)=>{

        if(imageUrls.length === 0){
            // TODO: do not reject the request with empty array, It is possible for an user to not post any images while posting
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


//delete images from cloudinary
const deleteImagesFromCloudinary = (imgUrls = []) =>{
    return new Promise((resolve,reject)=>{
        
        //If empty array was passed
        if(imgUrls.length === 0){
            resolve([]);
            return;
        }
          
        //else delete one by one
        imgUrls.map(async url=>{
            try{
                let publicId = 'codecrisp_media/'+extractPublicIdFromURL(url)
                let result = await cloudinary.uploader.destroy(publicId)
                resolve(result)
            }catch(err){
                reject(err)
            }
            
        })
    })
}

module.exports = { uploadImagesToCloudinary, deleteImagesFromCloudinary};