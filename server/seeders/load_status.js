import fs from 'fs'; 
import path from 'path';
import csv from 'csv-parser';
import { conecction } from '../conecction_db.js';



export async function loadStatusDb() {

    const route = path.resolve('server/data/status.csv');
    const status = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (statu) => {
                status.push([
                    statu.status_transaction
                    
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO statuss (status_transaction) VALUES ?';
                    const [result] = await conecction.promise().query(sql, [status]);

                    console.log(`✅ Se insertaron ${result.affectedRows} estados.`);
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