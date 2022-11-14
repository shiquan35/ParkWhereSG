import React from "react";

const IndivAvail = ({ lots }) => {
  return (
    <>
      <h4>Location</h4>
      <div>Coordinates: {lots.Location}</div>
      <div>Area: {lots.Development}</div>
      <div>Lot available: {lots.AvailableLots}</div>
      <div>Lot Type: {lots.LotType}</div>
      <div>CarparkID: {lots.CarParkID}</div>
      <br />
    </>
  );
};

export default IndivAvail;
