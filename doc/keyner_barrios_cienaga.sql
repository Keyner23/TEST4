CREATE DATABASE test4;
use test4;

CREATE TABLE users(
identification_number int  primary key unique ,
name varchar (50),
address varchar(200),
phone varchar(50),
email varchar (50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE plataform(
id_plataform int primary key auto_increment,
name varchar(50)
);

CREATE TABLE transactions(
id_transaction varchar(50) primary key,
transaction_time datetime,
transaction_amount int,
id_status int,
transaction_type varchar(50),
id_plataform int,

FOREIGN KEY (id_plataform) REFERENCES plataform(id_plataform),
FOREIGN KEY (id_status) REFERENCES statuss(id_status),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE statuss(
id_status int primary key auto_increment,
status_transaction varchar(50),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE billings(
number_billing varchar(50) primary key,
billing_period varchar(50),
invoiced_amount  int,
paid_amount int,
identification_number int,
id_transaction varchar(50),

FOREIGN KEY (identification_number) REFERENCES users(identification_number),
FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction)
);
