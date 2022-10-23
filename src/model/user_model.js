export const CREATE = `create table user (
    id int auto_increment primary key,
    firstName varchar(30),
    lastName varchar(30),
    phone varchar(15),
    password varchar(100),
    profile varchar(100)
)`
export const LOGIN = `select * from user where phone=?`
export const SELECT_PHONE = `select * from user where phone = ?`
export const REGISTER = `insert into user (firstName,lastName,phone,password) value ?`