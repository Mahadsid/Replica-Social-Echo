import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SCERET
});
    
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        //else upload on cloudinary
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded
        console.log("File has been uploaded successfully, and its response url in cloudinary.utils.js: ", (await response).url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation get failed
        return null;
    }
}

export { uploadOnCloudinary };