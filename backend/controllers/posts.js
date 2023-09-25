import Post from "../models/post.js";
import User from "../models/user.js";

//create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.lcoation,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      like: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//read post
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update
export const likePost = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;
    const post = await Post.findById(id);
    const isLike = post.likes.get(userId);

    if(isLike){
        post.likes.delete(userId);
    }else{
        post.like.set(userId, true);
    };

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        {likes: post.likes},
        {new: true}
    )
    
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
