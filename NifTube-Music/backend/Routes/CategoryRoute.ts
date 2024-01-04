import express, { NextFunction, Request, Response } from "express";
import { addCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategory } from "../Logic/CategoryLogic";
import songRouter from "./SongRoute";



const categoryRouter = express.Router();

// קטגוריה ראוטר
categoryRouter.get( // לקבל את כל הקטגוריות
  "/listCategories",
   async (request: Request, response: Response, next: NextFunction) => {
    console.log("in category route")
    return response.status(200).json(await getAllCategories());
    }
)


categoryRouter.get( // לקבל אלי על פי איידי
    "/categoryById/:id",
    async (request: Request, response: Response, next: NextFunction) => {
    const categoryID = +request.params.id;
    console.log(+request.params.id)
    console.log(`get id: ${categoryID}.`)
    return response.status(200).json(await getCategoryById(categoryID));
    });




categoryRouter.delete( //מחיקה
  "/categoryDeleteById/:id",
  async (request: Request, response: Response, next: NextFunction) => {
  const categoryID = +request.params.id;
  console.log(`Deleted id: ${categoryID}.`)
  return response.status(200).json(await deleteCategoryById(categoryID));

  
  });


  categoryRouter.post( // להוסיף
    "/addCategory",
    async (request: Request, response: Response, next: NextFunction) => {
    const newCategory = request.body;
    const result = await addCategory(newCategory);
    return response.status(201).json(`${result}`);
    });

// היחיד שלא עובד עדיין
  songRouter.put( // עדכון update
    "/updateCategory",
    async (request: Request, response: Response, next: NextFunction) => {
    const newCategory = request.body; // צריך להכניס בודי כשמעדכנים תוכן.
    return response.status(201).json(await updateCategory(newCategory));

    });


    export {categoryRouter};