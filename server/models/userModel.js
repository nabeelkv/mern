import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }
});

// Make Post Model from Post Schema
const UserAccount = mongoose.model('UserAccount', userSchema);

export default UserAccount;