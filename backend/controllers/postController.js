const Post = require("./../models/postModel");

exports.getPostSearchBased = async (req, res) => {
  try {
    console.log("req.query:", req.query);
    const search_text = req.query.q;

    const posts = await Post.aggregate([
      {
        $search: {
          index: "searchPosts",
          compound: {
            should: [
              {
                autocomplete: {
                  path: "title",
                  query: search_text,
                  tokenOrder: 'any',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 1,
                    maxExpansions: 256
                  }
                }
              },
              {
                autocomplete: {
                  path: "category",
                  query: search_text,
                  tokenOrder: 'any',
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 1,
                    maxExpansions: 256
                  }
                }
              }
            ]
          }
        }
      },
      {
        $set: {
          textScore: { $meta: "textScore" }
        }
      },
      {
        $sort: { textScore: -1 }
      },
      {
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: {
          newRoot: "$doc"
        }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1, 
          image: 1,
          numberOfLikes: 1,
          slug: 1,
          createdAt: 1,
          "user.name": 1
        }
      }
    ]);
    
    console.log(posts);
    

    res.status(200).json({
      status: "success",
      results: posts.length,
      posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find().populate({
        path: "user",
        select: "name",
      }).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

exports.getPostsByCategory = async (req, res) => {
    const category = req.query.category;
    console.log(category);
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
  
    try {
      const articles = await Post.find({ category }).populate({
        path: "user",
        select: "name",
      }).sort({ numberOfLikes: -1, createdAt: -1 });
    //   console.log(articles);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching articles by category', error });
    }
  };

exports.getTopPosts = async (req, res) => {
    try {
        console.log("top articles");
      const topArticles = await Post.find().populate(
        "user", "name profilePicture"
      ).sort({ numberOfLikes: -1 }).limit(5);
      res.status(200).json(topArticles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching top articles', error });
    }
  };

  exports.getPostById = async (req, res) => {
    try {
      const article = await Post.findById(req.params.id);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching article', error });
    }
  };

  exports.getPostBySlug = async (req, res) => {
    try {
      console.log(req.params.slug);
      const article = await Post.findOne({ slug: req.params.slug })
        .populate('user', 'name')
        .populate('comments');
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching article', error });
    }
  };

exports.createPost = async (req, res) => {
  if (!req.body.title || !req.body.content) {
    throw new Error('Please provide all required fields');
  }
  
  console.log("hello from backend/controllers/postController.js");
  console.log(req.body, req.user._id);
  const newPost = new Post({
    ...req.body,
    user: req.user._id,
  });
  console.log(newPost);
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({
        message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        throw new Error('Post not found');
      }
      
      console.log(post.user, req.user._id); 
      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            image: req.body.image
          },
        },
        { new: true }
      );
      
      console.log("updatedPost", updatedPost);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

exports.deletePost = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      if (post.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
      }
  
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

exports.likePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      if(post.user.toString() === req.user._id.toString()){
        return res.status(403).json({ message: 'You are not authorized to like this post' });
      }

      if(post.likes.includes(req.user._id)){
        return res.status(403).json({ message: 'You have already liked this post' });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            numberOfLikes: post.numberOfLikes + 1,
            likes: [...post.likes, req.user._id],
          },
        },
        { new: true }
      );
      console.log("updatedPost", updatedPost);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };

exports.unlikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (!post.likes.includes(req.user._id)) {
        return res.status(403).json({ message: 'You have not liked this post' });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            numberOfLikes: post.numberOfLikes - 1,
            likes: post.likes.filter((userId) => userId.toString() !== req.user._id.toString()),
          },
        },
        { new: true }
      );
      console.log("updatedPost", updatedPost);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  };
  
