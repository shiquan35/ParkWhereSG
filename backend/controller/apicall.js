const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;
const url =
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";
const url2 = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=500";
const url3 = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1000";
const url4 = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1500";
const url5 = "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=2000";

let apiCalls = [
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1000",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=1500",
  "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=2000"
]

let data = [];

const carparkAvail = async (req, res) => {
//   axios.all(apiCalls.map((call) => axios.get(call, {headers: {AccountKey: token,}, responseType: "json"})))
//   .then(
//   axios.spread((data1, data2, data3, data4, data5) => {
//     console.log({ data1, data2, data3, data4, data5 });
//     data = [...data1, ...data2, ...data3, ...data4, ...data5];
//   })
// );

// axios.all(apiCalls.map((call) => axios.get(call))).then(
//   (data) => console.log(data)
// );


  let tempData1 = [];
  let tempData2 = [];
  let tempData3 = [];
  let tempData4 = [];
  let tempData5 = [];

  await axios
    .get(url, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    
    .then((res) => {
      console.log("RESSSS",res);
      tempData1 = res.data.value;
      console.log("dataaaa",tempData1);
    })
    .catch((err) => console.log(err));
    // data = data.concat(tempData);

  await axios
    .get(url2, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    
    .then((res) => {
      console.log("RESSSS",res);
      tempData2 = res.data.value;
      console.log("dataaaa",tempData2);
    })
    .catch((err) => console.log(err));
    // data = data.concat(tempData);

  await axios
    .get(url3, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    
    .then((res) => {
      console.log("RESSSS",res);
      tempData3 = res.data.value;
      console.log("dataaaa",tempData3);
    })
    .catch((err) => console.log(err));
    // data = data.concat(tempData);

  await axios
    .get(url4, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    
    .then((res) => {
      console.log("RESSSS",res);
      tempData4 = res.data.value;
      console.log("dataaaa",tempData4);
    })
    .catch((err) => console.log(err));
    // data = data.concat(tempData);

  await axios
    .get(url5, {
      headers: {
        AccountKey: token,
      },
      responseType: "json",
    })
    
    .then((res) => {
      console.log("RESSSS",res);
      tempData5 = res.data.value;
      console.log("dataaaa",tempData5);
    })
    .catch((err) => console.log(err));
    // data = data.concat(tempData);
    // data = data.concat(tempData1,tempData2,tempData3,tempData4,tempData5);
    data = [...tempData1,...tempData2,...tempData3, ...tempData4,...tempData5];

  res.send(data);
};

module.exports = { carparkAvail };