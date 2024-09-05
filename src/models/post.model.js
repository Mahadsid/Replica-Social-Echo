import mongoose, { Schema } from "mongoose"; // ES module import for mongoose
import { promises as fs } from "fs"; // Use fs.promises for async file operations
import path from "path";
import { fileURLToPath } from "url";

// Since __dirname is not available in ES modules, we need to define it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    fileType: {
      type: String,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ content: "text" });

postSchema.pre("remove", async function (next) {
  try {
    if (this.fileUrl) {
      const filename = path.basename(this.fileUrl);
      const filePath = path.join(__dirname, "../assets/userFiles", filename);

      // Delete the file using fs.promises.unlink
      await fs.unlink(filePath);
    }

    // Delete all related comments
    await this.model("Comment").deleteMany({ _id: { $in: this.comments } });

    // Delete related report
    await this.model("Report").deleteOne({
      post: this._id,
    });

    // Update users' saved posts by removing the reference to this post
    await this.model("User").updateMany(
      { savedPosts: this._id },
      { $pull: { savedPosts: this._id } }
    );

    next();
  } catch (err) {
    next(err);
  }
});

export const Post = mongoose.model("Post", postSchema);
