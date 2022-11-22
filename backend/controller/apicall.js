const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;

let apiCalls = [
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1000",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=2000",
];

const carparkAvail = async (req, res) => {
  let allInfo;
  await axios
    .all(
      apiCalls.map((calls) =>
        axios.get(calls, {
          headers: {
            AccountKey: token,
          },
          responseType: "json",
        })
      )
    )
    .then(
      axios.spread((data1, data2, data3, data4, data5) => {
        allInfo = [
          ...data1.data.value,
          ...data2.data.value,
          ...data3.data.value,
          ...data4.data.value,
          ...data5.data.value,
        ];
        console.log(allInfo);
      })
    )
    .catch((err) => console.log(err));

  res.send(allInfo);
};

module.exports = { carparkAvail };