const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;
const url =
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";

let apiCalls = [
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1000",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=2000",
];

// const carparkAvail = async (req, res) => {
//   let data = [];
//   let final = [];
//   let test;
//   await axios.all(
//     apiCalls.map((calls) =>
//       axios
//         .get(calls, {
//           headers: {
//             AccountKey: token,
//           },
//           responseType: "json",
//         })
//         // .then(
//         //   axios.spread((data1, data2, data3, data4, data5) => {
//         //     console.log({ data1, data2, data3, data4, data5 });
//         //   })
//         // )
//         .then((res) => {
//           data.push(res.data.value);
//           console.log("passing through");
//         })
//         .catch((err) => console.log(err))
//     )
//   );

//   res.send(data);
// };

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
      console.log(data);
    })
    .catch((err) => console.log(err));

  res.send(data);
};

module.exports = { carparkAvail };
