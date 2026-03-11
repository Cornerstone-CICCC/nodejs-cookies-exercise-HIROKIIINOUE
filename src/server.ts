import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import pageRouter from "./routes/page.routes";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "EJS");
app.set("views", path.join(__dirname, "../src/views"));

app.use("/", pageRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
