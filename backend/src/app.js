import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://127.0.0.1:5500",
    credentials: true,
  }),
);

// middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes
import voterRouter from "./routes/voter.routes.js";
import adminRouter from "./routes/admin.routes.js";
import constituencyRouter from "./routes/constituency.routes.js";
import pollingStationRouter from "./routes/pollingStation.routes.js";
import candidateRouter from "./routes/candidate.routes.js";
import educationRouter from "./routes/education.routes.js";

app.use("/api/v1/voter", voterRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/constituency", constituencyRouter);
app.use("/api/v1/polling-station", pollingStationRouter);
app.use("/api/v1/candidate", candidateRouter);
app.use("/api/v1/education", educationRouter);

// error handler — always last
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export { app };
