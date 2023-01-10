"use strict";
// Messages should have:
// author
// content
// replies
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var MessageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
        min: [1, "Message content cannot be empty"],
        trim: true
    },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
var Message = mongoose_1["default"].model("Message", MessageSchema);
exports["default"] = Message;
