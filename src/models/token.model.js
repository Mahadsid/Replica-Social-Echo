import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

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
        createdAt: {
        type: Date,
        default: Date.now,
        },
    }
);

tokenSchema.methods.generateAccessToken = async function () {
    const populatedUser = await this.model('User').findById(this.user).select('username email');
    if (!populatedUser) {
        throw new Error('User not found');
    }
    return jwt.sign(
        {
            _id: this._id,
            userId: this.user,  // User ID
            username: populatedUser.username,  // Include username
            email: populatedUser.email,  // Include email
        },
        process.env.ACCESS_TOKEN_SCERET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
tokenSchema.methods.generateRefreshToken = async function () {
    
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SCERET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Token = mongoose.model("Token", tokenSchema);