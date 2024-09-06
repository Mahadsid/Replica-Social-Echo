import mongoose, { Schema } from "mongoose";

const relationshipSchema = new Schema(
    {
        follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    },
    {
        timestamps : true
    }
);

export const Relationship = mongoose.model("Relationship", ruleSchema);