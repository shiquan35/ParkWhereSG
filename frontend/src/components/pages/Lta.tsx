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

type CurrentLocation = {
  longitude: number;
  latitude: number;
  zoom: number;
};

const Homepage = () => {
  const [ltaCarparkAvail, setLtaCarparkAvail] = useState<CarparkDetails[]>([]);

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(
    null!
  );

  // null!

  const success = (pos: any): void => {
    const crd = pos.coords;
    setCurrentLocation({
      longitude: crd.longitude,
      latitude: crd.latitude,
      zoom: 16,
    });
    console.log("current lat", crd.latitude);
    console.log("current lng", crd.longitude);
  };

  const error = (err: any): void => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const options: { enableHighAccuracy: boolean; timeout: number } = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setLtaCarparkAvail(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log("current location", currentLocation);

  return (
    <>
      <h1>Main Page</h1>
      <h6>
        Disclaimer: Limited to data provided by LTA Datamall.
        <br />
        Zero lot availability could be due to missing data.
      </h6>
      {currentLocation && (
        <DisplayMap lotInfo={ltaCarparkAvail} currLocation={currentLocation} />
      )}
    </>
  );
};

export default Homepage;
