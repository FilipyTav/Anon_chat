import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import index_router from "./routes/index";
import board_router from "./routes/board";
import users_router from "./routes/users";
import User, { UserInterface } from "./mvc/models/User";

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

app.use(
    session({
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: true,
    })
);

passport.use(
    new LocalStrategy(async (username: string, password: string, done) => {
        try {
            const user: UserInterface | null = await User.findOne({ username });

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
    })
);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user: UserInterface | null = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(passport.initialize());
app.use(passport.session());

const port: Number = Number(process.env.PORT) || 6001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Setup static directory
app.use(express.static(path.join(__dirname, "/../dist")));

app.use("/", index_router);
app.use("/board", board_router);
app.use("/users", users_router);
