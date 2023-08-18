const programasCtrl = {};
const programasModel = require('../models/programasModel');




programasCtrl.getAllById_Unidad = async (id) => {
    const programas = await programasModel.getAllById_Unidad(id);
    return programas;
};

programasCtrl.getById = async (id) => {
    const programa = await programasModel.getById(id);
    return programa;
};


module.exports = programasCtrl;