import fs from 'fs'; 
import path from 'path';
import csv from 'csv-parser';
import { conecction } from '../conecction_db.js';



export async function loadTransaction() {

    const route = path.resolve('server/data/transactions.csv');
    const transactions = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (transaction) => {
                transactions.push([
                    transaction.id_transaction,
                    transaction.transaction_time,
                    transaction.transaction_amount,
                    transaction.id_status,
                    transaction.transaction_type,
                    transaction.id_plataform 
                    
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transactions (id_transaction,transaction_time,transaction_amount,id_status,transaction_type,id_plataform) VALUES ?';
                    const [result] = await conecction.promise().query(sql, [transactions]);

                    console.log(`✅ They were inserted ${result.affectedRows} transactions.`);
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