const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment({
      content: req.body.content,
      post: req.body.postId,
      user: req.user._id, 
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update comment
exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    console.log(comment.user, req.user._id);
    if (comment.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this comment' });
    }

    console.log(comment);
    comment.content = req.body.content;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await comment.remove();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get comments for a specific post
exports.getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    console.log("hello from getCommentsForPost");
    // console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
