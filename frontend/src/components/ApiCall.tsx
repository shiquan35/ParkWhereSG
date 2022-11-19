import React, { useState, useEffect } from "react";
import axios from "axios";
import LtaLots from "./LtaLots";
import { DisplayMap } from "./DisplayMap";

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

type CoordDetails = {
  Location: string;
};

type NumberArray = number[];

const ApiCall = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);
  const [coordinates, setCoordinates] = useState<NumberArray[][]>([]);

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

  useEffect(() => {
    // 1. 2D array for coordinates
    const coordinatesMap = ltaCarparkAvail.map(
      (lots: CoordDetails, i: number) => {
        let oneCarparkCoord: NumberArray = [];
        let allCarparkCoord: NumberArray[] = [];
        const oneCoord = lots.Location.split(" ");
        const oneLat = Number(oneCoord[0]);
        const oneLng = Number(oneCoord[1]);

        // oneCarparkCoord.push([oneLat, oneLng]);
        oneCarparkCoord.push(oneLat);
        oneCarparkCoord.push(oneLng);
        return (allCarparkCoord = [...allCarparkCoord, oneCarparkCoord]);
        // setCoordinates(allCarparkCoord);
      }
    );
    console.log(coordinatesMap);
    setCoordinates(coordinatesMap);
  }, [ltaCarparkAvail]);

  return (
    <>
      {/* <div>{lotAvailability}</div> */}
      <h1>Main Page</h1>
      {<DisplayMap />}
    </>
  );
};

export default ApiCall;
