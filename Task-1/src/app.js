import express from "express";
import cors from "cors";

const app = express();

// use cors middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" })); // set limti to accept json data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  // set limit to accept url data
app.use(express.static("./public"));


import eventRouter from "./routes/event.routes.js";    

app.use("/api/v3/app", eventRouter);    // configure route


export { app }