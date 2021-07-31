import mongoose from 'mongoose'
import { io } from '../http'

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex : true, 
  useFindAndModify : true
  })

mongoose.connection.once('open', () => { 
  console.log("💾 Connection successful") 
}).on('error', (err)=>{
  console.log('error', err)
})