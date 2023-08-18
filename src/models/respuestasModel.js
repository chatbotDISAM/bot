const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const respuestasModel = {

    async getAllById_Pregunta(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM respuestas WHERE Id_Pregunta = ?', [id]);
        conn.release();
        return rows;
        
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM respuestas WHERE Id = ?', [id]);
        conn.release();
        return rows[0];
    },

 
};

module.exports = respuestasModel;