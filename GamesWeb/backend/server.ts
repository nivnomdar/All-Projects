import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config"
import ErrorHandler from "./MiddleWare/route-not-found"
import GamesRoute from "./Routes/GamesRoute";
import usersRouter from "./Routes/UsersRoute";
import session from "express-session";
// import jwt from "jsonwebtoken";
//create server
const server = express();


//our middleWare
// עם קורס אפשר להגביל גישה לשרת שלנו
server.use(cors()); // cros = cross origin resource sharing.


//how we send the data back (JSON, XML, RQW, string)
//(JSON,XML,RAW,string)
server.use(express.json());



//where i will save my files from upload
server.use(express.static("upload"));

//enable file uploading, and create a path for the files if it not exists.
server.use(fileUpload({createParentPath: true }));

//using routes => localhost:4000/api/
server.use("/api/Games", GamesRoute);
server.use("/api/Users", usersRouter);





//handle errors(route not found)
server.use("*", ErrorHandler);



//start the server
server.listen(config.webPort, () => {
    console.log(`Server is running on http://localhost:${config.webPort}`);
});

