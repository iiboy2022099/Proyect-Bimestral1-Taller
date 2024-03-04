import User from '../user/user.model.js';
import Role from '../role/role.model.js';


const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await User.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido
}