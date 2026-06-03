import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

const allowedOrigins = Array.from(
  new Set(
    String(process.env.FRONTEND_URL || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  )
);

if (!allowedOrigins.includes("https://eventmanagementsystem-five.vercel.app")) {
  allowedOrigins.push("https://eventmanagementsystem-five.vercel.app");
}

console.log("Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS incoming origin:", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked CORS origin:", origin);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Message API");
});
app.use("/api/v1/message", messageRouter);

dbConnection();

export default app;
