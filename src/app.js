import express from "express"; //imported express
import applicationsRoutes from "./routes/applications.routes.js"; //imported routes
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://interntrack-mu.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRoutes);

export default app;
