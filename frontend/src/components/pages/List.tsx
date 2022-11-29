import * as React from "react";
import { v4 as uuid } from "uuid";

export interface IAppProps {
  lotInfo: {
    Agency: string;
    Area: string;
    AvailableLots: number;
    CarParkID: string;
    Development: string;
    Location: string;
    LotType: string;
  }[];

  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

export function List({ lotInfo, viewState }: IAppProps) {
  const carparkInfo = lotInfo.map((lot) => {
    if (
      Math.sqrt(
        (viewState.latitude - Number(lot.Location.split(" ")[0])) ** 2 +
          (viewState.longitude - Number(lot.Location.split(" ")[1])) ** 2
      ) <= 0.0035 &&
      lot.LotType === "C"
    ) {
      return (
        <>
          <li key={uuid()}>
            {lot.Development}
            {<br />}
            Lots Available: {lot.AvailableLots}
            {<br />}
          </li>
        </>
      );
    }
  });
  return (
    <>
      <div>
        <h1>Nearby Carparks</h1>
        {carparkInfo}
      </div>
    </>
  );
}
