import { gamesWeb } from './../frontend/src/Components/Redux/Store';
//import
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config"
import ErrorHandler from "./MiddleWare/route-not-found"
import GamesRoute from "./Routes/GamesRoute";
import usersRouter from "./Routes/UsersRoute";
import session from "express-session";

//create server
const server = express();

//our middleWare
// עם קורס אפשר להגביל גישה לשרת שלנו
server.use(cors()); // cros = cross origin resource sharing.


//how we send the data back (JSON, XML, RQW, string)
//(JSON,XML,RAW,string)
server.use(express.json());

// use session
server.use(session({
   secret: 'thisismysecret'
}));

//where i will save my files from upload
server.use(express.static("upload"));

//enable file uploading, and create a path for the files if it not exists.
server.use(fileUpload({createParentPath: true }));

//using routes => localhost:4000/api/
server.use("/api/Games", GamesRoute);
server.use("/api/Users", usersRouter);



//handle errors(route not found)
server.use("*", ErrorHandler);

// http://localhost:4000/api/users/allusers
server.get('/users', (req, res) => {
    res.json("http://localhost:4000/api/users/allusers");
})

//start the server
server.listen(config.webPort, () => {
    console.log(`listening on http://localhost:${config.webPort}`);
});

