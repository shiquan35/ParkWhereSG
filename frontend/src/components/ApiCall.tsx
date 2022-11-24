import React, { useState, useEffect } from "react";
import axios from "axios";
import LtaLots from "./LtaLots";
import { DisplayMap } from "./DisplayMap";
import "./styles.css";

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

const ApiCall = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  const lotAvailability = ltaCarparkAvail.map(
    (lots: CarparkDetails, i: number) => {
      return (
        <LtaLots
          key={i}
          agency={lots.Agency}
          area={lots.Area}
          availableLots={lots.AvailableLots}
          carparkId={lots.CarParkID}
          development={lots.Development}
          location={lots.Location}
          lotType={lots.LotType}
        />
      );
    }
  );

  return (
    <>
      {/* <div>{lotAvailability}</div> */}
      <h1>Main Page</h1>
      <h6>
        Disclaimer: Limited to data provided by LTA Datamall.
        <br />
        Zero lot availability could be due to missing data.
      </h6>
      {<DisplayMap lotInfo={ltaCarparkAvail} />}
    </>
  );
};

export default ApiCall;
