const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;

let apiCalls = [
  "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c",
  "https://data.gov.sg/api/action/datastore_search?offset=100&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c",
  "https://data.gov.sg/api/action/datastore_search?offset=200&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c",
  "https://data.gov.sg/api/action/datastore_search?offset=300&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c",
  "https://data.gov.sg/api/action/datastore_search?offset=400&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c",
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
