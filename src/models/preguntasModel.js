const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const preguntasModel = {

    async getAllById_Programa(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM preguntas WHERE Id_Programa = ?', [id]);
        conn.release();
        return rows;
        
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM preguntas WHERE Id = ?', [id]);
        conn.release();
        return rows[0];
    },

 
};

module.exports = preguntasModel;