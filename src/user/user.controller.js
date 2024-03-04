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

export const getUsers = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        users,
    });
}

export const putUser = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, correo, ...rest} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);

    }

    await User.findByIdAndUpdate(id, rest);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated User',
        user,
    });
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    await User.findByIdAndUpdate(id,{state: false});

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'Usuario eliminado exitosamente',
        user
    });
}

