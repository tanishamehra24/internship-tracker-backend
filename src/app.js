import express from "express"; //imported express
import applicationsRoutes from "./routes/applications.routes.js"; //imported routes
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://interntrack-mu.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors({
  origin: "https://interntrack-mu.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
// temp debug route
app.get("/ping", (req, res) => res.json({ message: "Server is alive!" }));
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRoutes); //mounting routes

export default app;
