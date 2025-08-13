import mysql from "mysql2"


export const conecction = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "test4"
})


conecction.connect((error) => {
    if (error) {
        console.error("Error connecting to MySQL:", error.message);
        return;
    }
    console.log("connected successfully");
});