import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once('open', () => { 
  console.log("💾 Connection successful") 
}).on('error', (err)=>{
  console.log('error', err)
})