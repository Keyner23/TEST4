import fs from 'fs'; 
import path from 'path';
import csv from 'csv-parser';
import { conecction } from '../conecction_db.js';



export async function loadusersdatabase() {

    const route = path.resolve('server/data/users.csv');
    const users = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (user) => {
                users.push([
                    user.identification_number,
                    user.name,
                    user.address,
                    user.phone,
                    user.email
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO users (identification_number,name,address,phone,email) VALUES ?';
                    const [result] = await conecction.promise().query(sql, [users]);

                    console.log(`✅ They were inserted ${result.affectedRows} users.`);
                    resolve(); 
                } catch (error) {
                    console.error('❌ Error inserting users:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading user CSV file:', err.message);
                reject(err);
            });
    });
}