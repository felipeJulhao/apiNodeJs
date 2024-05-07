import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    genero: {type: String, required: true},
    telefone: {type: String, required: false},
    cpf: {type: String, required: true},
    rg: {type: String, required: false}
})


export default mongoose.models.User || mongoose.model('Users', UserSchema)
