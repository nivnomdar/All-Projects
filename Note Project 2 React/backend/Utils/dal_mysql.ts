import mysql from "mysql";
import config from "./Config";

// יצירת ערוץ תקשורת
const connection = mysql.createPool({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database,
    port: config.mysql_port,
});


// פרומיס כי אנחנו לא יודעים איזה מידע יחזור אבל מבטיחים שיחזור
const execute = (sql: string):Promise<any>=>{
    return new Promise<any>((resolve, reject)=>{
        connection.query(sql, (err,res)=>{
            if (err){ // error
                reject(err);
                console.log("my sql error :", err);
                return;
            }
            // no error
            resolve(res);
        })
    })
}


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
// flush privileges;

export default { execute };