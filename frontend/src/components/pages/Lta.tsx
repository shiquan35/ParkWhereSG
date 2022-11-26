import { useState, useEffect } from "react";
import axios from "axios";
import { DisplayMap } from "./DisplayMap";
import "./MarkerStyles/markerStyles.css";

type CarparkDetails = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

const Homepage = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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

export default Homepage;
