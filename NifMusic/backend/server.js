import 'dotenv/config';

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
import { StaticContent } from "#MiddlewareStaticContent";

// import routes
import { ExampleRouter } from "#RouteExample";

// API Keys & Configurations
import { config } from '#UtilConfig';

import { _dirname } from "./fullPath.js";

const server = express();
server.use(cookieParser());
server.set('view engine', 'ejs');

// These lines contains a middleware responsible for creating important headers, for Apache & Node being able to communicate!
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

// Also related to Apache communication with Node...
server.set('trust proxy', 1);

// CORS configurations, change the domain after you will have a domain name of your own!
server.use( cors({
	domain: config.domain,
	origin: true,
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true
}));

// Being able to upload files into the server, the chosen maximal file size, is: 10Mb
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
}));

server.use(express.json({
	limit: 10 * 1024 * 1024,
	parameterLimit: 10 * 1024 * 1024
}));
server.use(express.urlencoded({
	limit: 10 * 1024 * 1024,
	extended: true
}));

server.use(session({
	genid: function(req) {
		return (Math.random() * 10).toString();
	},
	proxy: true,
	secret: config.secret,
	resave: true,
	saveUninitialized: true,
	cookie: {
		//secure: true,
		//sameSite: "strict",
		//httpOnly: true,
		//domain: config.domain,
		maxAge: config.loginMaxAge
	}
}));

// My example api route, for the path: "/api/v1/example"
server.use("/api/v1/example", ExampleRouter);

// middleware - if none of the api requests was used, give the visitor a file from the [Admin/User/Guest] folder!
server.use(StaticContent);

export { server };

// You see that trick?
// It will make your express to never shuting down, even if you will have some critical errors in your other files!
process.on('uncaughtException', function(e){
	console.log('Unexpected Error');
	console.log(e);
});
process.on('unhandledRejection', function(e){
	console.log('Unhandled Promise');
	console.log(e);
});

const port = process.env.PORT;
const listener = server.listen(port);