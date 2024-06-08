const mongoose = require("mongoose");
const slugify = require("slugify");

const postSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Post must be created by a user"],
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    likes: {
      type: [String],
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    //defined here to show virtual properties in the outputted data, because it does not get persisted into the database
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre("save", async function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });

postSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "post",
    localField: "_id",
  });

  postSchema.pre('findOneAndUpdate', function(next) {
    // Access the model directly and use updateOne or updateMany
    this.getUpdate().$set.createdAt = new Date();
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;