// User will have:
// username
// password
// messages

import mongoose, { Model, Schema } from "mongoose";

import { MessageInterface } from "./Message";

interface UserInterface extends Document {
    username: string;
    password: string;
    messages: MessageInterface[];
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

UserSchema.virtual("url").get(function () {
    return `/users/user/${this._id}`;
});

const User: Model<UserInterface> = mongoose.model<UserInterface>(
    "User",
    UserSchema
);

export default User;
export { UserInterface };
