
const mongoose = require('mongoose');

let inMemoryMode = false;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    inMemoryMode = false;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('Falling back to in-memory storage.');
    inMemoryMode = true;
  }
};

module.exports = connectDB;
module.exports.inMemoryMode = () => inMemoryMode; 