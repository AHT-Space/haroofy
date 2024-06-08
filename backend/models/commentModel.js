const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content should be there"],
      trim: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Comment must be of a post"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must be done by a user"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.index({ post: 1, user: 1 }, { unique: true });

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profilePicture",
  });
  next();
});

commentSchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { $set: { createdAt: new Date() } });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;