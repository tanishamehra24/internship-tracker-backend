import express from "express"; //imported express
import applicationsRoutes from "./routes/applications.routes.js"; //imported routes

const app = express();

app.use(express.json());
app.use("/api/applications", applicationsRoutes); //mounting routes

export default app;
