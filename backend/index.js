// both methods work but its only for localhost
// is it the same logic for external api?
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const carparkAPI = require("./controller/apicall");

app.use("/", carparkAPI.carparkAvail);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
