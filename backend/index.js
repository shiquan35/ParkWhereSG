require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

const lta = require("./controller/ltaCall");

app.use("/", lta.carparkAvail);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});