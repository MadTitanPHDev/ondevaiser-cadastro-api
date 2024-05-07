let Places = require('../model/Places');
const { deletar } = require('./UsersController');

const PlacesController = {
    async criar (req, res) {
        const {nomeLocal, endereco, cep, valor, caracteristicas, descricao} = req.body;
        let imgUrl = 'http:/localhost:3333/images/'
        if(req.file){
            imgUrl = imgUrl + `${req.file.filename}`
        }
        const novoLocal = {
            id: Places[Places.length-1]?.id ? Places[Places.length-1]?.id+1 : 1,
            nomeLocal: nomeLocal,
            endereco: endereco,
            cep: cep,
            valor: valor,
            caracteristicas: caracteristicas,
            dercricao: descricao,
            img: imgUrl
        }
        Places.push(novoLocal);
        return res.status(201).json(novoLocal)
    },
    async listar(req, res) {
        return res.status(200).json(Places);
    },
    async alterar (req, res) {
        const paramId = req.params.id;
        const {nomeLocal, endereco, cep, valor, caracteristicas, descricao} = req.body;
        let imgUrl = 'http:/localhost:3333/images/'
        if(req.file){
            imgUrl = imgUrl + `${req.file.filename}`
        }

        const local = Places.find(local => local.id === parseInt(paramId) ? true : false);
        const placeIndex = Places.findIndex(local => local.id === parseInt(paramId));

        local.nomeLocal = nomeLocal;
        local.endereco = endereco;
        local.cep = cep;
        local.valor = valor;
        local.caracteristicas = caracteristicas;
        local.descricao = descricao;

        Places[placeIndex] = local;
        return res.status(201).json(local);
    },
    async show(req, res) {
        const paramId = req.params.id;
        const local = Places.find(local=> local.id === parseInt(paramId) ? true:false);
        return res.status(201).json(local);
    },
    async deletar(req, res) {
        const paramId = req.params.id;
        const placeIndex = Places.findIndex(local => local.id === parseInt(paramId));
        Places = [
            ...Places.slice(0, placeIndex),
            ...Places.slice(placeIndex+1, Places.length)
        ]
        return res.status(200).json({mensagem: "Local deletado com sucesso!"});
    }

}

module.exports = PlacesController;