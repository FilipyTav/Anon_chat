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
    membership_status: string;
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: 1,
            unique: true,
            trim: true,
        },
        password: { type: String, required: true, min: 1 },
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
        membership_status: {
            type: String,
            enum: ["guest", "member", "admin"],
            required: true,
            default: "guest",
        },
    },
    { timestamps: true }
);

UserSchema.virtual("url").get(function () {
    return `/users/user/${this._id}`;
});

const User: Model<UserInterface> = mongoose.model<UserInterface>(
    "User",
    UserSchema
);

export default User;
export { UserInterface };
