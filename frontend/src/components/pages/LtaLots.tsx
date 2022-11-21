import React from "react";

type CarparkLotProps = {
  agency: string;
  area: string;
  availableLots: number;
  carparkId: string;
  development: string;
  location: string;
  lotType: string;
};

const LtaLots = (props: CarparkLotProps) => {
  return (
    <>
      <h4>Location</h4>
      <div>Coordinates: {props.location}</div>
      <div>Area: {props.development}</div>
      <div>Lots Available: {props.availableLots}</div>
      <div>Lot Type: {props.lotType}</div>
      <div>CarparkID: {props.carparkId}</div>
      <br />
    </>
  );
};

export default LtaLots;
