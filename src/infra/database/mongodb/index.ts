import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const {
  NODE_ENV,
  MONGO_DEV_URI,
  MONGO_PROD_URI,
} = process.env;


const databaseCredentials = {
  development: {
    mongoURI: MONGO_DEV_URI,
  },
  production: {
    mongoURI: MONGO_PROD_URI,
  }
};

const {
  mongoURI
} = databaseCredentials[NODE_ENV];


const connect = async (): Promise<boolean> => new Promise(res => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`Successfully connected to ${mongoURI}`);
      res(true);
    })
})

export default connect;