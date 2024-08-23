import dotenv from "dotenv";
import { app } from "./app.js"
import {connectDB } from "./db/connectDB.js";

dotenv.config({
    path: "./.env"  // configur env variabels
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection Error !!! ", err);
    })
