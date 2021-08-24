import multer from 'multer'
import { join } from 'path'

const options = {
  storage: multer.diskStorage({
    destination: join(__dirname, "..", '..', 'uploads'),
  
    filename: (req, file,cb) => {
      console.log('arquivooooooooooooooo ',file)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
    
  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = [
      'image/jpeg',
      'image/png',
      'video/mp4'
    ];

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
}
export { options }