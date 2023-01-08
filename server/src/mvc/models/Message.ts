// Messages should have:
// author
// content
// replies

import mongoose, { Model, Schema } from "mongoose";

interface MessageInterface extends Document {
    content: string;
    // replies: Omit<MessageInterface, "replies">;
}

const MessageSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: true,
            min: [1, "Message content cannot be empty"],
            trim: true,
        },
        // replies: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

const Message: Model<MessageInterface> = mongoose.model<MessageInterface>(
    "Message",
    MessageSchema
);

export default Message;
export { MessageInterface };
