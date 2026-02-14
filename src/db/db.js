import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();
//created a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, //used url instead of all parameters
});

pool
  .connect()
  .then(() => {
    console.log("DB Connected..");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err.message);
  });

export default pool;
