import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/all.js";
import router1 from "./routes/auth.js";
// import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/api", router1);
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Server Error is there" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

