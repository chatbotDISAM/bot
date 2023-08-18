const unidadesCtrl = {};
const unidadesModel = require('../models/unidadesModel');

unidadesCtrl.getUnidades = async () => {
    const unidades = await unidadesModel.getAll();
    return unidades;
};

unidadesCtrl.getById = async (id) => {
    const unidad = await unidadesModel.getById(id);
    return unidad;
};


module.exports = unidadesCtrl;