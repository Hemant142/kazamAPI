import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGO_URL = process.env.MONGO_URL || "";
const MONGO_DB = process.env.MONGO_DB || "assignment_Kazam";

let connection = async () => {
  try {
    let res = await mongoose.connect(
      `${MONGO_URL}${MONGO_DB}?retryWrites=true&w=majority`
    );
    console.log("DB JS connection");
  } catch (error) {
    console.log(error, "Db Connect error");
  }
};
export default connection;
