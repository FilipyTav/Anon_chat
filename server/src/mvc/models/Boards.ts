// Boards will have:
// array of boards

import mongoose, { Model, Schema } from "mongoose";

import { BoardInterface } from "./Board";

interface BoardsInterface extends Document {
    boards: BoardInterface[];
}

const BoardsSchema: Schema = new Schema({
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
});

const Boards: Model<BoardsInterface> = mongoose.model<BoardsInterface>(
    "Boards",
    BoardsSchema
);

export default Boards;
export { BoardsInterface };
