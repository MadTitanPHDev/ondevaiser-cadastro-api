let Users = require('../model/Users');

const UsersController = {
    async criar (req, res){
        const {nome, nick, cpf, email, senha, phone} = req.body;
        let imgUrl = 'http:/localhost:3333/images/'
        if(req.file){
            imgUrl = imgUrl + `${req.file.filename}`
        }
        const novoUser = {
            id: Users[Users.length-1]?.id ? Users[Users.length-1]?.id+1 : 1,
            nome: nome,
            nick: nick,
            cpf: cpf,
            email: email,
            senha: senha,
            phone: phone,
            img: imgUrl
        }
        Users.push(novoUser);
        return res.status(201).json(novoUser)
    },
    async listar(req, res) {
        return res.status(200).json(Users);
    },
    async alterar(req, res) {
        const paramId = req.params.id;
        const {nome, nick, cpf, email, senha, phone} = req.body;
        let imgUrl = 'http:/localhost:3333/images/'
        if(req.file){
            imgUrl = imgUrl + `${req.file.filename}`
        }

        const user = Users.find(user => user.id === parseInt(paramId) ? true : false);
        const userIndex = Users.findIndex(user => user.id === parseInt(paramId));

        user.nome = nome;
        user.nick = nick;
        user.cpf = cpf;
        user.email = email;
        user.senha = senha;
        user.phone = phone;
        user.img = imgUrl;

        Users[userIndex] = user;
        return res.status(201).json(user);
    },
    async show(req, res) {
        const paramId = req.params.id;
        const user = Users.find(user => user.id === parseInt(paramId) ? true : false);
        return res.status(201).json(user);
    },
    async deletar(req, res) {
        const paramId = req.params.id;
        const userIndex = Users.findIndex(user => user.id === parseInt(paramId));
        Users = [
            ...Users.slice(0, userIndex),
            ...Users.slice(userIndex+1, Users.length)
        ]
        return res.status(200).json({mensagem: "Usuario deletado com sucesso!"});
    }
}

module.exports = UsersController;