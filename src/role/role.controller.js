import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Role from './role.model.js';


export const rolePost = async (req, res) => {
    const {role} = req.body;
    const rooles = new Role ({role});

    await rooles.save();
    res.status (200).json({
        role
    });
}

