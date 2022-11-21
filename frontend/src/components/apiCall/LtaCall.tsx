import React, { useState, useEffect } from "react";
import axios from "axios";
import LtaLots from "../pages/LtaLots";

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

const LtaCall = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[] | []>(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(ltaCarparkAvail);

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

  return <div>{lotAvailability}</div>;
};

export default LtaCall;
