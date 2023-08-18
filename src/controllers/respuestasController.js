const respuestasCtrl = {};
const respuestasModel = require('../models/respuestasModel');




respuestasCtrl.getAllById_Pregunta = async (id) => {
    const respuestas = await respuestasModel.getAllById_Pregunta(id);
    return respuestas;
};

respuestasCtrl.getById = async (id) => {
    const respuestas = await respuestasModel.getById(id);
    return respuestas;
};


module.exports = respuestasCtrl;