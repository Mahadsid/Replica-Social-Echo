import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema(
    {
        email: {
        type: String,
        required: true,
        },
        verificationCode: {
        type: String,
        required: true,
        unique: true,
        },
        messageId: {
        type: String,
        required: true,
        },
        for: {
        type: String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        expires: 1800, // 30 minutes
        },
    }
);

export const Email = mongoose.model("Email", emailSchema);