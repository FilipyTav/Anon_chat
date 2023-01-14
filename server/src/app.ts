import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import cors from "cors";

import index_router from "./routes/index";
import board_router from "./routes/board";
import users_router from "./routes/users";
import User from "./mvc/models/User";

dotenv.config();

const mongoDB = process.env.MONGODB_CONNECTION || "";
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app: Application = express();

const port: Number = Number(process.env.PORT) || 6001;

app.use(cors({ origin: `http://localhost:${port}`, credentials: true }));

// Allows access to form content
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Parses json
app.use(express.json());

passport.use(
    new LocalStrategy(
        async (username: string, password: string, done: Function) => {
            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return done(null, false, { message: "Incorrect username" });
                }

                if (user.password !== password) {
                    return done(null, false, { message: "Incorrect password" });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser(function (user: any, done: Function) {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done: Function) => {
    try {
        const user = await User.findById(id);

        const user_information = {
            username: user?.username,
        };

        done(null, user_information);
    } catch (err) {
        done(err);
    }
});

app.use(
    session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/board", board_router);
app.use("/users", users_router);
