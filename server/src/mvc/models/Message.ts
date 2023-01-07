// Messages should have:
// author
// content
// replies

import mongoose, { Model, Schema } from "mongoose";

import { UserInterface } from "./User";

interface MessageInterface extends Document {
    author: UserInterface;
    content: string;
    replies: Omit<MessageInterface, "replies">;
}

const MessageSchema: Schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: {
        type: String,
        required: true,
        min: [1, "Message content cannot be empty"],
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Message: Model<MessageInterface> = mongoose.model<MessageInterface>(
    "Message",
    MessageSchema
);

export default Message;
export { MessageInterface };
