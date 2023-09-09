// node builtin modules
import path from 'node:path';
import process from 'node:process';
// express modules
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
// import middleware
import ErrorHandler from "./MiddleWare/route-not-found"
// import routes
// import { SessionsRouter } from "./Routes/SessionsRoute";
import GamesRoute from "./Routes/GamesRoute";
import usersRouter from "./Routes/UsersRoute";
// API Keys & Configurations
import config from "./Utils/Config"
// Directory full path
import _dirname from "./fullPath"
import loginRouter from './Routes/LoginRoute';

const domain = config.domain ?? "";

//create server
const server = express();

server.use(cookieParser());


//our middleWare
// עם קורס אפשר להגביל גישה לשרת שלנו
 // cros = cross origin resource sharing.
// Cross origin sharing of resources (cors)

server.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Origin",
		"*"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, PUT, POST, DELETE"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Forwarded-Proto, X-Forwarded-Port"
	);
	next();
});

// Used for apache communication with node
server.set('trust proxy', 1);


// Cross origin sharing of resources (cors)
server.use( cors({
	origin: true,
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true
}));

//enable file uploading, and create a path for the files if it not exists.
server.use( fileUpload({
	createParentPath: true,
	limits: {
		fileSize: 10 * 1024 * 1024
	},
	useTempFiles : true,
	tempFileDir : path.join(_dirname,'/.temporary-upload-files/'),
	parseNested: true,
	uriDecodeFileNames: true,
	safeFileNames: true,
	debug: false
}))

//how we send the data back (JSON, XML, RQW, string)
//(JSON,XML,RAW,string)
server.use(express.json({
	limit: 10 * 1024 * 1024
}));


server.use(express.urlencoded({
	limit: 10 * 1024 * 1024,
	extended: true
}));

server.use(session({
	genid: function(req) {
		return Math.random.toString().slice(2)+Math.random.toString().slice(2);
	},
	proxy: true,
	secret: config.secret,
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		sameSite: "strict",
		httpOnly: true,
		domain: domain,
		maxAge: config.loginMaxAge
	}
}));






//using routes => localhost:4000/api/
server.use("/api/Games", GamesRoute);
server.use("/api/Users", usersRouter);
server.use("/api/Login", loginRouter);


// Handles fatal errors, they will not shut down the server
process.on('uncaughtException', function(e){
	console.log('Unexpected Error');
	console.log(e);
});
process.on('unhandledRejection', function(e){
	console.log('Unhandled Promise');
	console.log(e);
});


//handle errors(route not found)
server.use("*", ErrorHandler);



//start the server
server.listen(config.webPort, () => {
    console.log(`Server is running on http://localhost:${config.webPort}`);
});

