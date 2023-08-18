const preguntasCtrl = {};
const preguntasModel = require('../models/preguntasModel');




preguntasCtrl.getAllById_Programa = async (id) => {
    const preguntas = await preguntasModel.getAllById_Programa(id);
    return preguntas;
};

preguntasCtrl.getById = async (id) => {
    const preguntas = await preguntasModel.getById(id);
    return preguntas;
};


module.exports = preguntasCtrl;