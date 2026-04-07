import express from "express"; //imported express
import applicationsRoutes from "./routes/applications.routes.js"; //imported routes
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: [
    "https://interntrack-mu.vercel.app/", // 🔁 replace with your actual Vercel URL
    "http://localhost:5000",        // for local dev
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Handle preflight requests explicitly
app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRoutes); //mounting routes

export default app;
