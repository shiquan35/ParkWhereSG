const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;
const url =
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

const carparkAvail = async (req, res) => {
  let data = [];
  await axios
    .get(url, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    .then((res) => {
      data = res.data.value;
    })
    .catch((err) => console.log(err));

  res.send(data);
};

module.exports = { carparkAvail };
