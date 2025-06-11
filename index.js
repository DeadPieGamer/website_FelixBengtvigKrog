import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("assets"))
app.use(express.static("css"))
app.use(express.static("js"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/resume", (req, res) => {
  res.sendFile(__dirname + "/public/resume.html");
});

app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/public/projects/projects.html");
});

app.get("/projects/personal/retrace", (req, res) => {
  res.sendFile(__dirname + "/public/projects/personal/retrace.html");
});

app.get("/projects/uni/fingerspelling", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/fingerspelling.html");
});

app.get("/projects/uni/killeronboard", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/killeronboard.html");
});

app.get("/projects/uni/ordhandel", (req, res) => {
  res.sendFile(__dirname + "/public/projects/uni/ordhandel.html");
});

app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/public/projects/projects.html");
});

app.get("/404", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use( (req, res, send) => {
  res.redirect("/404");
})