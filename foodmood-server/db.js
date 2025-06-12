const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect( `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodmood-cluster.rl4o3.mongodb.net/demo-foodmood-client?retryWrites=true&w=majority&appName=demo-foodmood-cluster`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
