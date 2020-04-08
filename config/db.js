// 导入数据库模块

const mysql = require("mysql");

//设置数据库链接属性
let connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mygame"
});

//开始连接数据库
connect.connect();

//抛出
module.exports = connect;