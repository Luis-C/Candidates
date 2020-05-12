const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const path = require("path");
const errorHandler = require("./_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());
console.log(__dirname);
app.use("/", express.static(path.join(__dirname, "/public/dist/Candidates")));

app.use("/user", require("./routes/user.router"));
app.use("/stalker", require("./routes/stalker.router"));

// Fixing error on refresh
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/dist/Candidates/index.html"));
});
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 3030;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
