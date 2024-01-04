import { OkPacket } from "mysql";
import { Category } from "../Models/Category";
import dal_mysql from "../Utils/dal_mysql";

// קטגוריות
const getAllCategories = async()=>{
    console.log("in Category logic")

    const SQLcmd = "SELECT * FROM category";
    const data = await dal_mysql.execute(SQLcmd);
   console.log(data);
    return data;
 }
 


 const getCategoryById = async (id: number) => {
    const SQLcmd = `SELECT * FROM category WHERE id=${id}`;
    const data = await dal_mysql.execute(SQLcmd);
    return data;
 }


const deleteCategoryById = async (id:number) => {
    const SQLcmd = `DELETE FROM songs WHERE id=${id}`;
    const data = await dal_mysql.execute(SQLcmd);
    return data;
}

const addCategory = async (newCategory:Category) =>{
    const SQLcmd = `
    INSERT INTO category
    (name)
    VALUES
    ('${newCategory.name}')
    `;
    console.log(SQLcmd);
    // ok packet - מחזיר לי את ה insert id
    const result: OkPacket = await dal_mysql.execute(SQLcmd);
    return result.insertId;

}


// היחיד שלא עובד עדיין
const updateCategory = async (category: Category)=>{
    const SQLcmd = `
    UPDATE category
    SET name = '${category.name}'
    WHERE id = ${category.id};
    `;
    await dal_mysql.execute(SQLcmd);
    return true;
}




 export {getAllCategories,
     getCategoryById,
      deleteCategoryById,
      addCategory,
      updateCategory
    }