const mongoose = require("mongoose");

const connectDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindANdModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
