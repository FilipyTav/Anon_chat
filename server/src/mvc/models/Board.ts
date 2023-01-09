// Board will have:
// name
// messages

import mongoose, { Model, Schema } from "mongoose";

import { MessageInterface } from "./Message";

interface BoardInterface extends Document {
    name: string;
    messages: MessageInterface[];
    url: string;
}

const opts = {
    timestamps: true,
    toJSON: { virtuals: true },
    // toObject: { virtuals: true},
};

const BoardSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    opts
);

BoardSchema.virtual("url").get(function () {
    return `/board/${this.name}`;
});

// BoardSchema.set("toJSON", { getters: true, virtuals: true });

const Board: Model<BoardInterface> = mongoose.model<BoardInterface>(
    "Board",
    BoardSchema
);

export default Board;
export { BoardInterface };
