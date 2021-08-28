import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Response } from 'express'

const cloudinaryConfig = (request: Request, response: Response, next: NextFunction) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })
}
export { cloudinary, cloudinaryConfig }