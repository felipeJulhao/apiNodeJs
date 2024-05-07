import User from '../models/user.js'

export const getUsers = async () => {
    const user = await User.find()
    return user
}

export const getUser = async (id) => {
    const user = User.findById(id)
    return user
}

export const createUser = async (params) => {
    if (!validateEmail(params.email)) {
        throw new Error('E-mail inválido');
    }

    if (!validateCPF(params.cpf)) {
        throw new Error('CPF inválido');
    }

    const user = new User({
        nome: params.nome,
        email: params.email,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    })
    await user.save()
    return user
}

export const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, {
        nome: params.nome,
        email: params.email,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    }, {
        new: true
    })
    return user
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;

    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;
    let sum = 0, remainder;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}