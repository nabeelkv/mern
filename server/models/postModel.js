import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'Default Title'
    },
    message: String,
    creator: String,
    name: String,
    tags: {
        type: [String],
        default: ['tag', 'tag2']
    },
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Make Post Model from Post Schema
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;