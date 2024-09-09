import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; 


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
        },
        avatar: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        followers: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
        ],
        following: [
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
        ],
        location: {
        type: String,
        default: "",
        },

        bio: {
        type: String,
        default: "",
        },

        interests: {
        type: String,
        default: "",
        },

        role: {
        type: String,
        enum: ["general", "moderator", "admin"],
        default: "general",
        },

        savedPosts: [
        {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
        },
        ],

        isEmailVerified: {
        type: Boolean,
        default: false,
        },
    }, {
        timestamps: true,
    }
)

//For $text queries to work, MongoDB needs to index the field with a text index. To create this index by mongoose use
userSchema.index({ username: 'text' });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

//custom methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)