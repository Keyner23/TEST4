#  INVOICE MANAGER

This is a system designed for the best administration of a user transaction company. The backend was built with **node.js** and the apis were raised with **express**, we manage a relational database, in this project we use **mysql** and the frontend is managed with **vite** and **boostrap**, the backend is located in the **server folder** and the frontend is located in the **app folder**.The loading of users, statuses, invoices and transactions was done from the node in bulk.

---

## 🚀 Technologies used

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript, Boostrap(Frontend)
- csv-parser (to load data from CSV files)
- vite

---

## Explanation of normalization
First, we detailed the file part by part to understand what was being requested from us, then we separated the CSV files to create the table with its fields and then create the massive insertion with Node. Then I created the relational model in Drawio and then we made the query based on the files that we separated, and thus I performed the normalization where no field is repeated and each one is in its corresponding table.



## 📁 Project structure
```bash
TEST4/
│
├── app/ # Frontend (HTML, CSS, JS)
│       ...
├── server/ # Backend
│       ...
├── server/ 
│       ...
├── index.html  
├── LICENSE
├── .gitignore
└── README.md
```


## 📦 Facility

1. Clone the repository:

```bash
git clone https://github.com/Keyner23/TEST4.git
cd TEST4
```
2. Install dependencies:

```bash
npm install MYSQL2
npm install express
npm install cors
npm install csv-parser
npm i
```

4. Initialize the backend:
```bash
node server/conecction_db.js
node server/enpoints.js

```
5. upload the file in bulk:
You must open the terminal and then execute the following routes for bulk loading of data:
```bash
node server/seeders/run_seeders.js 

```
5. Initialize the frontend:
```bash
npm run dev
```


# NAME: Keyner Andres Barrios Ochoa
# CLAN: Cienaga
# Correo: keinerba.ochoa@gmail.com