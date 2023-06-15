import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';



config({
  path: "./config/config.env",
});
const app = express();
// usng middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}))

// importing the routes
import post from "./routes/post.js";
import user from "./routes/user.js";

// using the routes

app.use("/api/v1", post);
app.use("/api/v1", user);



app.get("/",(req,res)=>{
  res.send(`<h1> Site is working. click <a href=${process.env.FRONTEND_URL}> here to visit frontend </h1>`);
})

export default app;
