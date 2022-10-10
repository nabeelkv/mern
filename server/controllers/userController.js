import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserAccount from '../models/userModel.js';

export const signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        //checking for existing user in the database
        const existingUser = await UserAccount.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: 'Email doesn\'t exist.' });
        
        //checking the password for requested email if user email exist
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        
        //create a token for logged user as session
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: '1h' });

        return res.status(200).json({ result: existingUser, token });

    } catch (error) {

        return res.status(500).json({ message: error });

    }
}


export const signupController = async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    try {
       
        //checking the requested email already exist in the database
        const existingUser = await UserAccount.findOne({ email });
        if(existingUser) return res.status(400).json({ message: 'User already exist.' });
        
        //checking the password and confirm password
        if(password !== confirmPassword) return res.status(400).json({ message: 'Password don\'t match.' });
        
        //hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserAccount.create({ email: email, password: hashedPassword, name });

        //create token for the new user
        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: '1h' });
        return res.status(200).json({ result, token });

    } catch (error) {

        return res.status(500).json({ message: error });

    }
}

export const googlesigninController = async (req, res) => {
    const { email, password, name } = req.body;

    try {
       
        //checking for existing user in the database
        const existingUser = await UserAccount.findOne({ email });
        if(existingUser) {

           //checking the password for requested email if user email exist
           //const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
           //if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        
           //create a token for logged user as session
           const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: '1h' });
   
           return res.status(200).json({ result: existingUser, token });
           
        } else {
             
           //hash password and create user
           const hashedPassword = await bcrypt.hash(password, 12);
           const result = await UserAccount.create({ email, password: hashedPassword, name });

           //create token for the new user
           const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: '1h' });
           return res.status(200).json({ result, token });

        }

        

    } catch (error) {

        return res.status(500).json({ message: error });

    }
}