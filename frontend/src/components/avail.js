import React, { useEffect, useState } from "react";
import axios from "axios";
import IndivAvail from "./indivAvail";

const Avail = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState([]);
  const [datagovCarparkAvail, setDatagovCarparkAvail] = useState([]);
  const [datagovHdb, setDatagovHdb] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(ltaCarparkAvail);
  const lotAvailability = ltaCarparkAvail.map((lots, i) => {
    return <IndivAvail lots={lots} key={i + 1} />;
  });

  //https://data.gov.sg/dataset/carpark-availability?resource_id=4f4a57d1-e904-4326-b83e-dae99358edf9
  useEffect(() => {
    axios
      .get("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then((res) => setDatagovCarparkAvail(res.data.items[0].carpark_data))
      .catch((err) => console.log(err));
  }, []);

  //https://data.gov.sg/dataset/hdb-carpark-information
  // only gives me 100 but total records say 2182?
  useEffect(() => {
    axios
      .get(
        "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c"
      )
      .then((res) => setDatagovHdb(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  console.log(datagovCarparkAvail);
  console.log(datagovHdb);

  return <div>{lotAvailability}</div>;
};

export default Avail;
