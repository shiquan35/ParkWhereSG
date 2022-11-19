import * as React from "react";
import carparks from "../data/carparks.json";

type CarparkLotProps = {
  agency: string;
  area: string;
  availableLots: number;
  carparkId: string;
  development: string;
  location: string;
  lotType: string;
};

export function GetCoord(props: CarparkLotProps) {
  // const carparkList = carparks.map((parks, i) => {
  //   const coordArray = parks.Location.split(" ");
  //   const carparkLat = coordArray[0];
  //   const carparkLng = coordArray[1];
  //   return (
  //     <>
  //       <li key={i + 1}>
  //         {i}
  //         {<br />}
  //         {carparkLat}
  //         {<br />}
  //         {carparkLng}
  //       </li>
  //       ;
  //     </>
  //   );
  // });
  // console.log("list", carparkList);
  // return (
  //   <>
  //     <div>Display coords</div>
  //     {carparkList}
  //   </>
  // );
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
}
