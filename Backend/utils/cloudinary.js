import { v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (file) => {
    console.log(file)

    try {
        const result = await cloudinary.uploader.upload(file.path)

        fs.unlinkSync(file.path)
        console.log(result)
        return result.secure_url
    } catch (error) {
        console.log(error)
        fs.unlinkSync(file.path)
        
    }
}