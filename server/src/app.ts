import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import index_router from "./routes/index";
import board_router from "./routes/board";
import users_router from "./routes/users";

dotenv.config();

const mongoDB = process.env.MONGODB_CONNECTION || "";
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app: Application = express();

// Allows access to form content
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Parses json
app.use(express.json());

const port: Number = Number(process.env.PORT) || 6001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/board", board_router);
app.use("/users", users_router);
