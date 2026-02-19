import express from "express"; //imported express
import applicationsRoutes from "./routes/applications.routes.js"; //imported routes
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/applications", applicationsRoutes); //mounting routes

export default app;
