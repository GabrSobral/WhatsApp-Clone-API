import { cloudinary } from "../../config/cloudinary"

class handleControlFileOnCloud {
  async delete(public_id: string) {
    await cloudinary.uploader.destroy( public_id, {resource_type: 'video'},
      async (error, result) => {
        if(result.result == "not found"){
          await cloudinary.uploader.destroy( public_id,
            (error, result) => {
              if(error){ throw new Error(error.message) }
            }
          )
        }
      }
    )
  }

  async upload(file: Express.Multer.File) {
    const file_data = await cloudinary.uploader.upload(
      file.path,
      { resource_type: "auto", overwrite: true },
      (error, result) => {
        if(error) {throw new Error(`Error: ${error.message} status:500`)}
    })

    return file_data
  }
}

export default new handleControlFileOnCloud()