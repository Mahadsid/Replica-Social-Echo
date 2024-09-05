import mongoose, { Schema } from "mongoose";

const ruleSchema = new Schema(
    {
        rule: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
);

export const Rule = mongoose.model("Rule", ruleSchema);