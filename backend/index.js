import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
// import csrf from "csurf";
// import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errMiddleware";
import UserRoutes from "./routes/UserRoutes";

const app = express();
dotenv.config();

//const csrfProtection = csrf({ cookie: true });

// middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// parse cookies
// we need this because "cookie" is true in csrfProtection
//app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(csrfProtection);
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.use("/api/user", UserRoutes);

// connecting to the database
connectDB();

// error handler readdirSync
app.use(notFound);
app.use(errorHandler);

// listen on port
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Running ${process.env.NODE_ENV} mode on port 5000`)
);

// Access Key id -> AKIASBMIZ3GVLQDP3Y3W
// Secret -> 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
