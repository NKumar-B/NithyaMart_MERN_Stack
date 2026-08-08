import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_team_4';
    const isAtlas = connStr.includes('mongodb+srv://') || connStr.includes('mongodb.net');
    
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log(`\n [MongoDB Connected] Host: ${conn.connection.host}`);
    console.log(` [Database Name]: ${conn.connection.name}`);
    console.log(` [Connection Type]: ${isAtlas ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'}\n`);
  } catch (error) {
    console.warn(`\n  [MongoDB Warning]: Connection failed (${error.message}).`);
    console.warn(`  [Tip]: Ensure your IP address is whitelisted in MongoDB Atlas and your MONGODB_URI in .env is correct.\n`);
  }
};

export default connectDB;

