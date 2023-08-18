const mysql = require('mysql2/promise');
const config = require('../configs/db');


const pool = mysql.createPool(config);

const unidadesModel = {
    async getAll() {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM unidades');
        conn.release();
      
        return rows;
        
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM unidades WHERE id = ?', [id]);
        conn.release();
        return rows[0];
    },

 
};

module.exports = unidadesModel;