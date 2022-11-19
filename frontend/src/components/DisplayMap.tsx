import * as React from "react";
// import { Map, useMap } from "react-map-gl";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.MAPBOX_TOKEN; // doesnt work
export interface IAppProps {}

export function DisplayMap(props: IAppProps) {
  return (
    <>
      <div>
        <ReactMapGL
          style={{
            width: "500px",
            height: "500px",
            border: "2px solid black",
          }}
          // ideally start at current user location
          initialViewState={{
            longitude: 103.8198,
            latitude: 1.3521,
            zoom: 9,
          }}
          // mapboxAccessToken={TOKEN}
          mapboxAccessToken="pk.eyJ1IjoiYW5uYXNxIiwiYSI6ImNsYWh5Y3k5ZDA5cDAzdmxma3pjNHBud2UifQ.N58yLSvFXR8Szwg5Zw4cag"
          mapStyle="mapbox://styles/mapbox/streets-v9"
        ></ReactMapGL>
      </div>
    </>
  );
}
