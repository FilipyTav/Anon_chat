"use strict";
// Board will have:
// name
// messages
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var opts = {
    timestamps: true,
    toJSON: { virtuals: true }
};
var BoardSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }]
}, opts);
BoardSchema.virtual("url").get(function () {
    return "/board/".concat(this.name);
});
// BoardSchema.set("toJSON", { getters: true, virtuals: true });
var Board = mongoose_1["default"].model("Board", BoardSchema);
exports["default"] = Board;
