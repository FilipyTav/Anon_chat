#! /usr/bin/env node

console.log(
    "This script populates some test items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

type BoardType = {
    name: string;
    messages: MessageInterface[];
};

type MessageType = {
    author: UserInterface;
    content: string;
    // replies: Omit<MessageInterface, "replies">[];
};

type UserType = {
    username: string;
    password: string;
    membership_status: string;
};

// type CategoryType = {
//     name: String;
//     description: String;
// };

import async from "async";
import bcrypt from "bcryptjs";

import Board, { BoardInterface } from "./mvc/models/Board";
import Message, { MessageInterface } from "./mvc/models/Message";
import User, { UserInterface } from "./mvc/models/User";

import mongoose from "mongoose";
const mongoDB = userArgs[0];

mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Deletes all the current data in database, if necessary
User.collection.drop();
Message.collection.drop();
Board.collection.drop();

const users: UserInterface[] = [];
const messages: MessageInterface[] = [];
const boards: BoardInterface[] = [];

async function UserCreate({
    username,
    password,
    membership_status,
    cb,
}: {
    username: string;
    password: string;
    membership_status: string;
    cb: Function;
}) {
    const hashed_password = await bcrypt.hash(password, 12);

    const user_detail: UserType = {
        username,
        password: hashed_password,
        // messages: null,
        membership_status,
    };

    // if (messages) user_detail.messages = messages;

    const user = new User(user_detail);

    try {
        await user.save();

        console.log("New User: " + user);
        users.push(user);
        cb(null, user);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

async function MessageCreate(
    author: UserInterface,
    content: string,
    // replies: Omit<MessageInterface, "replies">[],
    cb: Function
) {
    const message_detail: MessageType = {
        author,
        content,
        // replies: [],
    };

    // if (replies.length) message_detail.replies = replies;

    const message = new Message(message_detail);

    try {
        await message.save();

        console.log("New Message: " + message);
        messages.push(message);
        cb(null, message);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

async function BoardCreate(
    name: string,
    messages: MessageInterface[],
    cb: Function
) {
    const board_detail: BoardType = {
        name,
        messages: [],
    };

    if (messages.length) board_detail.messages = messages;

    const board = new Board(board_detail);

    try {
        await board.save();

        console.log("New Board: " + board);
        boards.push(board);
        cb(null, board);
    } catch (err) {
        cb(err, null);
        console.log(err);
    }
}

const createUsers = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        let results = await async.parallel(
            [
                function (callback: Function) {
                    UserCreate({
                        username: "Fake",
                        password: "pw",
                        membership_status: "guest",
                        cb: callback,
                    });
                },
                function (callback: Function) {
                    UserCreate({
                        username: "user1",
                        password: "passw",
                        membership_status: "member",
                        cb: callback,
                    });
                },
                function (callback: Function) {
                    UserCreate({
                        username: "user2",
                        password: "password",
                        membership_status: "member",
                        cb: callback,
                    });
                },
                function (callback: Function) {
                    UserCreate({
                        username: "user3",
                        password: "random password",
                        membership_status: "guest",
                        cb: callback,
                    });
                },
                function (callback: Function) {
                    UserCreate({
                        username: "userm",
                        password: "random password",
                        membership_status: "member",
                        cb: callback,
                    });
                },
                function (callback: Function) {
                    UserCreate({
                        username: "whatever",
                        password: "random thingy",
                        membership_status: "admin",
                        cb: callback,
                    });
                },
            ],
            // This callback is not optional at all
            // without it async.series does not work
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const createMessages = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        const result = await async.parallel(
            [
                function (callback: Function) {
                    MessageCreate(users[0], "first message", callback);
                },
                function (callback: Function) {
                    MessageCreate(users[1], "second message", callback);
                },
                function (callback: Function) {
                    MessageCreate(
                        users[2],
                        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                        callback
                    );
                },
                function (callback: Function) {
                    MessageCreate(users[3], "lorem10", callback);
                },
                function (callback: Function) {
                    MessageCreate(users[5], "lorem ipsum or smt", callback);
                },
            ],
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const createBoards = async (
    cb: async.AsyncResultArrayCallback<unknown, Error> | undefined
) => {
    try {
        let results = await async.parallel(
            [
                function (callback: Function) {
                    BoardCreate(
                        "general",
                        [messages[1], messages[2], messages[3], messages[4]],
                        callback
                    );
                },
                function (callback: Function) {
                    BoardCreate("specific", [messages[0]], callback);
                },
            ],
            cb
        );
    } catch (err) {
        console.log(err);
    }
};

const init = async () => {
    try {
        const results = await async.series([
            createUsers,
            createMessages,
            createBoards,
        ]);

        console.log("Users: " + users);

        // All done, disconnect from database
        mongoose.connection.close();
    } catch (err) {
        console.log("FINAL ERR: " + err);
    }
};

init();
