import mongoose from 'mongoose';
import PostMessage from '../models/postModel.js';


//Get all posts
export const getPostsController = async (req, res) => {
    const { page } = req.query;

    try {
        
        const LIMIT = 5;
        const startIndex = (Number(page) -1) * LIMIT;  //get the starting index of every page
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); //sort by post id desc
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });


    } catch (error) {

        res.status(404).json({ message: error });


    }
}

//Get single post
export const getPostController = async (req, res) => {
    const { id } = req.params;

    try {
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with ID` });
        const post = await PostMessage.findById(id);
        res.status(200).json(post);


    } catch (error) {

        res.status(404).json({ message: error });


    }
}

export const getPostsBySearchController = async (req, res) => {
    const { q, page } = req.query; //here we can also used params, (?query vs :query)

    try {

        const LIMIT = 5;
        const startIndex = (Number(page) -1) * LIMIT;  //get the starting index of every page
        
        const message = RegExp(q, 'i'); //'i means - [ flag of i ] means = Test, TEST, test === same';
        const name = RegExp(q, 'i');

        const total = await PostMessage.countDocuments({ $or: [ { message }, { name } ] });
        
        const posts = await PostMessage.find({ $or: [ { message }, { name } ] }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex); //sort by post id desc
        
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });



    } catch (error) {
        
        res.status(404).json({ message: error });

    }
}

export const createPostController = async (req, res) => {
    const post = req.body; //const { title, message, selectedFile, creator, tags } = req.body

    // check requested user already is logged in by checking authMiddleware
    // if(!req.userId) return res.json({ message: 'Unauthenticated' });


    try {

        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });   //new PostMessage({ title, message, selectedFile, creator, tags });
        await newPost.save();
        res.status(201).json(newPost);


    } catch (error) {

        res.status(409).json({ message: error });

    }
}

export const updatePostController = async (req, res) => {
    const { id: _id } = req.params;
    const { message, selectedFile } = req.body;
    
    try {
        
        //check post is exist
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: `No post with ID: ${_id}` });
        const post = await PostMessage.findById(_id);
        if(!post) return res.status(404).json({ message: 'No post with that ID' });
        
        // check requested user and post creator are same
        if(!req.userId || req.userId !== post.creator) return res.json({ message: 'Unauthenticated' });
    
        //update post
        const updatedPost = { message, selectedFile, _id: _id };
        await PostMessage.findByIdAndUpdate(_id, updatedPost, { new: true });
        return res.json({ message: 'Post updated!' });


    } catch (error) {

        res.status(409).json({ message: error });

    }
    
  
}

export const deletePostController = async (req, res) => {
    const { id: _id } = req.params;
    
    try {
        
        //check post is exist
        const post = await PostMessage.findById(_id);
        if(!post) return res.status(404).json({ message: 'No post with that ID' });
        
        // check requested user and post creator are same
        if(!req.userId || req.userId !== post.creator) return res.json({ message: 'Unauthenticated' });
        
        //delete post
        await PostMessage.findByIdAndRemove(_id);
        return res.json({ message: 'Post deleted successfully!' });


    } catch (error) {

        res.status(409).json({ message: error });

    }
    
  
}

export const likePostController = async (req, res) => {
    const { id: _id } = req.params;
    
    try {
        
        //check post is exist
        const post = await PostMessage.findById(_id);
        if(!post) return res.status(404).json({ message: 'No post with that ID' });
        
        // check requested user and post creator are same
        if(!req.userId) return res.json({ message: 'Unauthenticated' });
        
        const index = post.likes.findIndex((_id) => _id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
          } else {
            post.likes = post.likes.filter((_id) => _id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

        res.status(200).json(updatedPost);

    } catch (error) {

        res.status(409).json({ message: error });

    }
    
  
}




export const commentPostController = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
  
    const post = await PostMessage.findById(_id);
  
    post.comments.push(value);
  
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  
    res.json(updatedPost);
  };