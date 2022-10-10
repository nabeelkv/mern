import mongoose from 'mongoose';
import PostMessage from '../models/postModel.js';


//Get all posts
export const getPostsController = async (req, res) => {

    try {

        const postMessages = await PostMessage.find().sort({ _id: -1 }); //sort by post id desc
        res.status(200).json(postMessages);


    } catch (error) {

        res.status(404).json({ message: error });


    }
}

export const getPostsBySearchController = async (req, res) => {
    const { searchQuery } = req.query; //here we can also used params, (?query vs :query)

    try {

        const message = RegExp(searchQuery, 'i'); //'i means - [ flag of i ] means = Test, TEST, test === same';
        const name = RegExp(searchQuery, 'i');
        const postMessages = await PostMessage.find({ $or: [ { message }, { name } ] }).sort({ _id: -1 }); //sort by post id desc
        res.status(200).json(postMessages);


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
