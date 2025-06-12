import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { readFile, writeFile } from "node:fs";

const app = express();
const port = 3000;

app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/assets", express.static("assets"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));

app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/resume", (req, res) => {
  res.sendFile(__dirname + "/public/resume.html");
});

app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/public/projects.html");
});

app.get("/projects/personal/retrace", (req, res) => {
  res.sendFile(__dirname + "/public/projects/personal/retrace.html");
});

app.get("/projects/personal/web-game", (req, res) => {
  res.sendFile(__dirname + "/public/projects/personal/web-game.html");
});

// Saves a move into the current game
app.post("/projects/personal/web-game", (req, res) => {
  console.log("JSON-ifying: " + req.body);
  writeFile(
    __dirname + "/assets/game-demos/tic-tac-toe/game-board.json",
    JSON.stringify(req.body),
    "utf8",
    () => {
      console.log("finished writing file");
    }
  );
  //Do something with the data
  // console.log(req.body);
  res.sendStatus(200);
});

// Gives the current state of the game JSON file
app.get("/projects/personal/web-game/current", (req, res) => {
  readFile(
    __dirname + "/assets/game-demos/tic-tac-toe/game-board.json",
    "utf8",
    (err, data) => {
      if (!err) {
        console.log("I got data: " + data);
        res.json(data);
        console.log("data sent");
      } else {
        console.log("ohnoes, got error: " + err);
        res.sendStatus(404);
      }
    }
  );
});

app.get("/projects/uni/killeronboard", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/killeronboard.html");
});

app.get("/projects/uni/ordhandel", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/ordhandel.html");
});

app.get("/projects/uni/fingerspelling", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/fingerspelling.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// If trying to reach a url that does not exist (ie not any of the above ones), instead go to the 404 page
app.use((req, res, send) => {
  res.sendFile(__dirname + "/public/404.html");
});
