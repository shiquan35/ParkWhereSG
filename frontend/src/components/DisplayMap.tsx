import * as React from "react";
// import { Map, useMap } from "react-map-gl";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import carparkImage from "../carpark.png";

const TOKEN = process.env.MAPBOX_TOKEN; // doesnt work

type NumberArray = number[];

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

  coordinates: NumberArray[][];
}

// type LotInfoProps = {
//   lotInfo: {
//     Agency: string;
//     Area: string;
//     AvailableLots: number;
//     CarParkID: string;
//     Development: string;
//     Location: string;
//     LotType: string;
//   }[];
// };

type LotInfo = {
  Agency: string;
  Area: string;
  AvailableLots: number;
  CarParkID: string;
  Development: string;
  Location: string;
  LotType: string;
};

export function DisplayMap({ lotInfo, coordinates }: IAppProps) {
  // props.lotInfo.Location
  // console.log(props.lotInfo[0].Location);
  // console.log("lotInfo", lotInfo);
  // console.log("coords", coordinates);

  const [selectedCarpark, setSelectedCarpark] = React.useState<LotInfo | null>(
    null
  );
  const [toggleDisplayMarkers, setToggleDisplayMarkers] =
    React.useState<boolean>(false);

  const handleToggle = (): void => {
    setToggleDisplayMarkers(!toggleDisplayMarkers);
  };

  console.log("SELECTED", selectedCarpark);
  console.log("LAT", Number(selectedCarpark?.Location.split(" ")[0]));
  return (
    <>
      {console.log("Lng", Number(selectedCarpark?.Location.split(" ")[1]))}
      <div className="map">
        <ReactMapGL
          style={{
            width: "700px",
            height: "700px",
            border: "2px solid black",
          }}
          // ideally start at current user location
          initialViewState={{
            longitude: 103.8198,
            latitude: 1.3521,
            zoom: 10,
          }}
          // mapboxAccessToken={TOKEN}
          mapboxAccessToken="pk.eyJ1IjoiYW5uYXNxIiwiYSI6ImNsYWh5Y3k5ZDA5cDAzdmxma3pjNHBud2UifQ.N58yLSvFXR8Szwg5Zw4cag"
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {toggleDisplayMarkers &&
            lotInfo.map((lot) => (
              <Marker
                // key={lot.CarParkID}
                latitude={Number(lot.Location.split(" ")[0])}
                longitude={Number(lot.Location.split(" ")[1])}
              >
                <button
                  className="markerButton"
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedCarpark(lot);
                  }}
                >
                  <img src={carparkImage} alt="Carpark" />
                </button>
              </Marker>
            ))}
          {/* {lotInfo.map((lot) => (
            <Marker
              // key={lot.CarParkID}
              latitude={Number(lot.Location.split(" ")[0])}
              longitude={Number(lot.Location.split(" ")[1])}
            >
              <button
                className="markerButton"
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedCarpark(lot);
                }}
              >
                <img src={carparkImage} alt="Carpark" />
              </button>
            </Marker>
          ))} */}

          {selectedCarpark && (
            <Popup
              longitude={Number(selectedCarpark.Location.split(" ")[1])}
              latitude={Number(selectedCarpark.Location.split(" ")[0])}
              // anchor="bottom"
              // closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedCarpark(null)}
            >
              <div>
                <h2>{selectedCarpark.Development}</h2>
                <h2>Lots available: {selectedCarpark.AvailableLots}</h2>
              </div>
              <button>TEST BUTTON</button>
            </Popup>
          )}
        </ReactMapGL>
      </div>
      <button onClick={handleToggle}>Display Markers</button>
    </>
  );
}
