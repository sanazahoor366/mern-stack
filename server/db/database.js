import mongoose from "mongoose";
import env from 'dotenv'
env.config()
const mongourl = process.env.MONGO_URI
const dbconnection = mongoose
  .connect(mongourl)
  .then(() => console.log(`db connection: ${"123123"}`))
  .catch(() => console.log(`geeting some error in db connection`));
export default dbconnection;
