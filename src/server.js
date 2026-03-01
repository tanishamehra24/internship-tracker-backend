import "dotenv/config";
import app from "./app.js";
import "./db/db.js";

const PORT = process.env.PORT;
//starting the server...
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}...`);
});
