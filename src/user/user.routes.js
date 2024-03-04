import { Router } from "express";
import { check } from "express-validator";
import {
    userPost,
    getUsers,
    putUser,
    deleteUser
} from "./user.controller.js";
import {
    existeUsuarioById,
    existenteEmail
} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.get("/", getUsers);

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
        check("email", "Este no es un correo válido").isEmail(),
        check("email").custom(existenteEmail),
        validarCampos,
    ],
    userPost 
);

router.put(
    "/:id",
    [
        check("id", "This is not a valid ID").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    putUser

);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], deleteUser);


export default router;