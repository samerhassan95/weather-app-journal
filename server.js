projectData = {};

// Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");

app.use(cors());

/* Initializing the main project folder */

app.use(express.static("website"));

const port = 8000;

const server = app.listen(port, listening);

function listening() {
  console.log("server running");

  console.log(`running on localhost: ${port}`);
}

// GET method route

function sendData(request, response) {
  response.send(projectData);
}

// POST method route

function addData(req, res) {
  console.log("req.body: ", req.body);

  projectData["date"] = req.body.date;

  projectData["temperature"] = req.body.temp;

  projectData["user_response"] = req.body.content;

  console.log(projectData);

  res.send(projectData);
}

app.get("/all", sendData);

app.post("/add", addData);
