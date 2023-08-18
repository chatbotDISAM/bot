const mysql = require('mysql2/promise');
const config = require('../configs/db');


const pool = mysql.createPool(config);

const conversacionesModel = {
    async getAll() {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM conversaciones');
        conn.release();
      
        return rows;
        
    },

    async getById(id) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT * FROM conversaciones WHERE id = ?', [id]);
        conn.release();
        return rows[0];
    },

    async getByRemitente(celular) {
        const conn = await pool.getConnection();
        const [rows, fields] = await conn.query('select*from conversaciones WHERE Remitente = ? order by id desc limit 1;', [celular]);
        conn.release();
        return rows[0];
    },

    async create(data) {
        const conn = await pool.getConnection();
        const [result, fields] = await conn.query('INSERT INTO conversaciones SET ?', [data]);
        conn.release();
        return result.insertId;
    },

    



 
};

module.exports = conversacionesModel;