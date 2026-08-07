import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lulu-mart-bangalore'
  const isAtlas = uri.includes('mongodb+srv://') || uri.includes('mongodb.net')
  
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000
  })
  console.log(`\n MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`)
  console.log(` Connection Type: ${isAtlas ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'}\n`)
}

 