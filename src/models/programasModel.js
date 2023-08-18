const mysql = require('mysql2/promise');
const config = require('../configs/db');

const pool = mysql.createPool(config);

const programasModel = {

    async getAllById_Unidad(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM programas WHERE id_unidad = ?', [id]);
        conn.release();
        return rows;
        
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM programas WHERE Id = ?', [id]);
        conn.release();
        return rows[0];
    },

 
};

module.exports = programasModel;