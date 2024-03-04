


const {Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    role:{
        type:String,
        required: [true, "The role name is required"]
    }
});

export default model('Role', RoleSchema);