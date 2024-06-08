const User = require("./../models/userModel");
const Post = require("./../models/postModel");

exports.getUser = async (req, res) => {
    try {
      const user_id = req.user._id;
      const user = await User.findOne({ _id: user_id});
      res.status(200).json({
        status: "ok",
        user,
      });
    } catch (err) {
      res.json({
        status: "fail",
        message: err.message,
      });
    }
  };

exports.getTotalLikes = async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user._id });
  
      const totalLikes = posts.reduce((acc, post) => acc + post.numberOfLikes, 0);
  
      res.status(200).json({ totalLikes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getPostsByMe = async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user._id });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getLikedPosts = async (req, res) => {
    try {
      const likedPosts = await Post.find({ likes: req.user._id }).populate("user", "name");
  
      res.status(200).json(likedPosts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

