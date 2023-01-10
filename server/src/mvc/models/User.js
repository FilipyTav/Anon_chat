"use strict";
// User will have:
// username
// password
// messages
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var opts = {
    timestamps: true,
    toJSON: { virtuals: true }
};
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        min: 1,
        unique: true,
        trim: true
    },
    password: { type: String, required: true, min: 1 },
    // messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    membership_status: {
        type: String,
        "enum": ["guest", "member", "admin"],
        required: true,
        "default": "guest"
    }
}, opts);
UserSchema.virtual("url").get(function () {
    return "/users/user/".concat(this._id);
});
// UserSchema.set("toJSON", { getters: true, virtuals: true });
var User = mongoose_1["default"].model("User", UserSchema);
exports["default"] = User;
