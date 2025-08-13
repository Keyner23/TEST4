import fs from 'fs'; 
import path from 'path';
import csv from 'csv-parser';
import { conecction } from '../conecction_db.js';



export async function loadPlataforms() {

    const route = path.resolve('server/data/plataform.csv');
    const plataforms = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (plataform) => {
                plataforms.push([
                    plataform.name,
                    
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO plataform (name) VALUES ?';
                    const [result] = await conecction.promise().query(sql, [plataforms]);

                    console.log(`✅ Se insertaron ${result.affectedRows} usuarios.`);
                    resolve(); 
                } catch (error) {
                    console.error('❌ Error al insertar usuarios:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de usuarios:', err.message);
                reject(err);
            });
    });
}