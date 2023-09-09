import dal_mysql from "../Utils/dal_mysql";
import User from "../Models/UserModal";
import { OkPacket } from "mysql";




//  (ללא סיסמא) (שם משתמש ומייל)
const getAllUsers = async () => {
  const SQL = `SELECT user_id, first_name, last_name, email, password, role FROM users`;
  return await dal_mysql.execute(SQL);
  
}


// קבלת רשימת משתמשים (ללא סיסמא) (שם משתמש ומייל)
const getUserList = async () => {
    const SQL = `SELECT user_id, first_name, last_name, email, role FROM users`;
    return await dal_mysql.execute(SQL);
    
}

// POST
const addUser = async (newUser: User) => {
    const SQL = `INSERT INTO users
    (first_name, last_name, email, password)
    VALUES
    (
        '${newUser.first_name}',
        '${newUser.last_name}',
        '${newUser.email}',
        '${newUser.password}'
    )
    `;
    console.log(SQL);
    const result: OkPacket = await dal_mysql.execute(SQL);
    return result.insertId;
};


// קבלת יוזר וסיסמא
const checkLogin = async (email: string, password: string) => {
  const SQL = `
  SELECT count(*) as userok, user_id as user_id
  FROM users
  WHERE email='${email}'
  AND password='${password}'`;
  const result = await dal_mysql.execute(SQL);

  if (result.length > 0 && result[0].userok === 1) {
    // Login successful, return the user object
    // const userID = result[0].user_id;
    // console.log( "LOGIC: user id logged in: ", userID);
    console.log( "Logic! user success", result);


    return result[0];
    
  } else {
    // Login failed, return null or throw an error
    console.log("LOGIC Error Checklogin")
    return console.error("something didnt work");
     // Or throw an error indicating login failure
  }
}

  export {getUserList, checkLogin, addUser, getAllUsers};