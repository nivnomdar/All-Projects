import process from "node:process";
import express from "express";

const ExampleRouter = express.Router();

ExampleRouter.get("/", async function (request, response) {
  let query = request.query;

  try {
    let info = {};

    if (
      request.session &&
      request.session.role &&
      request.session.role == "Admin"
    ) {
      response.status(200).send("Admin");
    } else if (
      request.session &&
      request.session.role &&
      request.session.role == "User"
    ) {
      response.status(200).send("User");
    } else {
      throw new Error("Error: visitor does not have an active session");
    }
  } catch (e) {
    console.log(e);
    response.status(403).end();
  }
});

ExampleRouter.post("/", async function (request, response) {
  let body = request.body;

  try {
    if (
      request.session &&
      request.session.role &&
      request.session.role == "Admin"
    ) {
      throw new Error(`Admin: ${request.ip} is alreay logged in`);
    } else if (
      request.session &&
      request.session.role &&
      request.session.role == "User"
    ) {
      throw new Error(`User: ${request.ip} is alreay logged in`);
    } else {
      // In real life, password are requested from the database & are kept differently inside the database!
      const adminPassword = "12345678";
      const userPassword = "1234";

      if (body.password == adminPassword) {
        request.session.role = "Admin";
        request.session.hiii = "Hello!";
        response.status(200).end();
        return;
      } else if (body.password == userPassword) {
        request.session.role = "User";
        request.session.what_i_will_put_in_that_example = "Hello World!";
        request.session.but_i_want_to_create_a_second_junk_just_for_fun =
          "Hello again!!";
        response.status(200).end();
        return;
      } else {
        throw new Error(`Error: no match for ${request.ip} credentials!`);
      }
    }
  } catch (e) {
    console.log(e);
    response.status(403).end();
  }
});

ExampleRouter.delete("/", async function (request, response) {
  try {
    if (
      request.session &&
      request.session.role &&
      request.session.role == "Admin"
    ) {
      request.session.role = null;
    } else if (
      request.session &&
      request.session.role &&
      request.session.role == "User"
    ) {
      request.session.role = null;
    } else {
      throw new Error("Guest can't logout!");
    }

    response.status(200).end();
  } catch (e) {
    console.log(e.message);

    response.status(403).end();
  }
});

export { ExampleRouter };
