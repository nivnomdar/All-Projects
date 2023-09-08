// import express from "express";
// import path from "node:path";
// import fs from "node:fs";
// import { _dirname, adminPath, userPath, guestPath } from "../fullPath.js";

// const SendContent = function (req, res, next, rolePath) {
//   // If the visitor request a directory (not a single file), give him the index.html file (that's a very rude visitor!)
//   let url = req.originalUrl;
//   let last = url.split("/");
//   last = last[last.length - 1];
//   if (url != url.replace(/\/$/, "") || !last.includes(".")) {
//     url = "index.html";
//   }

//   // Maybe the file does not exist! if that the case: give him the index.html
//   const dirs = url.split("/");
//   let root = path.join(rolePath, ...dirs.slice(0, dirs.length - 1));
//   let file = dirs[dirs.length - 1];
//   const ok = fs.existsSync(path.join(root, file));
//   if (!ok) {
//     root = rolePath;
//     file = "index.html";
//   }

//   // Finally! send the desired file to the visitor :)
//   const options = {
//     root: root,
//   };
//   res.sendFile(file, options, function (err) {
//     if (err) {
//       console.log(err);
//       return next();
//     } else {
//       console.log(`Sent: ${file}`);
//       return next();
//     }
//   });
// };

// export const StaticContent = async function (request, response, next) {
//   try {
//     // If there is still no role specified: give `null`
//     request.session.role = request.session.role ?? null;

//     // Shhhh... I know your IP address :^)
//     console.log(`Request from IP: ${request.ip}`);

//     if (
//       request.originalUrl.includes("/.") ||
//       request.originalUrl.includes("./") ||
//       request.originalUrl.includes("..") ||
//       request.originalUrl.includes("\\")
//     ) {
//       // Detect some common bad requests, used by nasty hackers!
//       console.log(
//         `Bad request from ${request.ip} (${request.method} ${request.originalUrl})`
//       );
//       return response.status(403).end();
//     }

//     if (
//       request.method.toLowerCase() != "get" ||
//       request.originalUrl.includes("/api/")
//     ) {
//       // Simply, do not check for static content permissions, if the visitor do not want any static content at all...
//       console.log(
//         `API request (${request.method} ${request.originalUrl}): no role checks needed`
//       );
//       return next();
//     }

//     const isAdmin =
//       request.session &&
//       request.session.role &&
//       request.session.role == "Admin";
//     const isUser =
//       request.session && request.session.role && request.session.role == "User";

//     if (isAdmin) {
//       console.log(`Admin (${request.method} ${request.originalUrl})`);
//       return SendContent(request, response, next, adminPath);
//     } else if (isUser) {
//       console.log(`User (${request.method} ${request.originalUrl})`);
//       return SendContent(request, response, next, userPath);
//     } else {
//       console.log(`Guest (${request.method} ${request.originalUrl})`);
//       return SendContent(request, response, next, guestPath);
//     }
//   } catch (e) {
//     console.log("StaticContent() middleware Error!");
//     console.log(e);
//     return SendContent(request, response, next, guestPath);
//   }
// };
