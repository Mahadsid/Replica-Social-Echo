import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        refreshToken: {
        type: String,
        required: true,
        },
        accessToken: {
        type: String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        expires: 6 * 60 * 60, // 6 hours
        },
    }
);

export const Token = mongoose.model("Token", tokenSchema);