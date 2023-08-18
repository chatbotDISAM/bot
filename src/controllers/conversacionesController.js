const conversacionesCtrl = {};
const conversacionesModel = require('../models/conversacionesModel');

conversacionesCtrl.getUnidades = async () => {
    const conversaciones = await conversacionesModel.getAll();
    return conversaciones;
};

conversacionesCtrl.getById = async (id) => {
    const conversacion = await conversacionesModel.getById(id);
    return conversacion;
};

conversacionesCtrl.getByRemitente = async (celular) => {
    const conversacion = await conversacionesModel.getByRemitente(celular);
    return conversacion;
};

conversacionesCtrl.create = async (from, to, Mensaje = false) => {
  
    
    const conversacion = {
        'Remitente': from,
        'Receptor': to,
        'Mensaje': Mensaje
    }
  
    const conversacion_id = await conversacionesModel.create(conversacion);
    return conversacion_id;
};

module.exports = conversacionesCtrl;