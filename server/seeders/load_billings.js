import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { conecction } from '../conecction_db.js';



export async function loadBilling() {

    const route = path.resolve('server/data/billings.csv');
    const billings = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(route)
            .pipe(csv())
            .on("data", (billing) => {
                billings.push([
                    billing.number_billing,
                    billing.billing_period,
                    billing.invoiced_amount,
                    billing.paid_amount,
                    billing.identification_number,
                    billing.id_transaction

                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO billings (number_billing,billing_period,invoiced_amount,paid_amount,identification_number,id_transaction) VALUES ?';
                    const [result] = await conecction.promise().query(sql, [billings]);

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