import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto',
        })
        // console.log('File uploaded successfully to Cloudinary',response.url)
        fs.unlinkSync(localFilePath) // Delete the local file after successful upload
        return response
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        return null
    }
}
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return null
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        })
        return response
    } catch (error) {
        return null
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }