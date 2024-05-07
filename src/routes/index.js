const express = require('express');
const usersController = require('../controller/UsersController');
const placesController = require('../controller/PlacesController');
const multer = require('multer');
const router = express.Router();
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req,file,cb) => {
        const extensaoArquivo = file.originalname.split('.') [1]
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
})

const upload = multer({storage});

router.get('/ping', (req, res) => {
    res.json({
        "pong":"true"
    })
})

//usuarios
router.get('/users', usersController.listar);
router.post('/users', upload.single('img'), usersController.criar);
router.put('/users/:id', upload.single('img'), usersController.alterar);
router.get('/users/:id', usersController.show);
router.delete('/users/:id', usersController.deletar);

//locais
router.get('/places', placesController.listar);
router.post('/places', upload.single('img'), placesController.criar);
router.put('/places/:id', upload.single('img'), placesController.alterar);
router.get('/places/:id', placesController.show);
router.delete('/places/:id', placesController.deletar);

module.exports = router;

