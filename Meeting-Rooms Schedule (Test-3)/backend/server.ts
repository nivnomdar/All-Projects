//import
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import config from "./Utils/Config"
import ErrorHandler from "./MiddleWare/route-not-found"
import router from "./Routes/SimpleRouter";
import carRouter from "./Routes/CarRouter";
import examRouter from "./Routes/examRouter";


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

//using routes => localhost:4000/api/v1/test/CheckOK
server.use("/api/v1/test", router);
server.use("/api/v1/car", carRouter);
server.use("/api/v1/exam", examRouter);

//handle errors(route not found)
server.use("*", ErrorHandler);

//start the server
server.listen(config.webPort, () => {
    console.log(`listening on http://localhost:${config.webPort}`);
    console.log(`for testing use the path http://localhost:${config.webPort}/api/v1/test/checkOK`)
    console.log(`for testing use the path http://localhost:${config.webPort}/api/v1/test/checkBad`)
});