import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token de petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'USER no existe en la base de datos'
            })
        }

        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario en estado false'
            })
        }

        if (user.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'Unauthorized access - Role not allowed'
            });
        }

        req.user = user;
        next();

    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}