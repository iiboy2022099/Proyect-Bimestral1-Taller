import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPost = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();
    res.status(200).json({
        user,
    });
}

