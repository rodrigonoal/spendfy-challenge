const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const {
    DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME,
  } = process.env;
  const urlMongoDB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

  await mongoose.connect(
    urlMongoDB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  );
};

module.exports = connectMongoDB;
