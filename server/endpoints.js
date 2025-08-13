import express from "express"
import cors from "cors"
import { conecction } from "./conecction_db.js";


const app = express()
app.use(cors())
app.use(express.json());



//GET CON EXPRESS METHOD

app.get("/users", (req, resp) => {
    conecction.query("select * from users", (error, result) => {
        if (error) throw error
        resp.json(result)
    })
})


// ADVANCED CONSULTS  POSTMAN

app.get("/totalpaid", (req, res) => {
    const sql = `SELECT u.identification_number,SUM(b.paid_amount) AS total_pagado 
    FROM billings b JOIN users u ON b.identification_number = u.identification_number 
    GROUP BY u.identification_number;`

    conecction.query(sql, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(results);
    });
});


// THIS IS PLATFORM TRANSACTIONS

app.get("/transactions/platform/:name", (req, res) => {
    const plataforma = req.params.name;

    const sql =
        `SELECT 
            t.id_transaction,
            t.transaction_amount,
            p.name AS plataforma,
            u.identification_number,
            b.number_billing,
            b.paid_amount
        FROM transactions t
        JOIN plataform p ON t.id_plataform = p.id_plataform
        JOIN billings b ON t.id_transaction = b.id_transaction
        JOIN users u ON b.identification_number = u.identification_number
        WHERE p.name = ?;`

    conecction.query(sql, [plataforma], (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).json({ error: "Server error" });
        }
        res.json(results);
    });
});



// POST METHOD WITH EXPRESS

app.post("/createuser", (req, res) => {
    const { id, name, email, address, phone } = req.body;

    const sql = `
        INSERT INTO users (identification_number,name,address, phone,email) 
        VALUES (?, ?, ?, ?,?)
    `;

    conecction.query(sql, [id, name, address, phone, email], (err, result) => {
        if (err) {
            console.error("Error al insertar:", err.message);
            return res.status(500).json({ error: "Error inserting data" });
        }
        res.status(201).json({ mensaje: "Se regitro correctamente el usuario", id: result.insertId });
    });
});


//SERVER IN THE PORT

app.listen(3000, (error) => {
    if (error) {
        console.error("Error al iniciar el servidor:", error.message);
        return;
    }
    console.log("api se levanto correctamente");
});