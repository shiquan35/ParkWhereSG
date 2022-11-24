import * as React from "react";
// import { Map, useMap } from "react-map-gl";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import carparkImage from "../carpark.png";

const TOKEN = process.env.MAPBOX_TOKEN; // doesnt work
const mapboxToken =
  "pk.eyJ1IjoiYW5uYXNxIiwiYSI6ImNsYWh5Y3k5ZDA5cDAzdmxma3pjNHBud2UifQ.N58yLSvFXR8Szwg5Zw4cag";

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

  // coordinates: NumberArray[][];
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

type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export function DisplayMap({ lotInfo }: IAppProps) {
  // props.lotInfo.Location
  // console.log(props.lotInfo[0].Location);
  console.log("lotInfo", lotInfo);
  // console.log("coords", coordinates);
  const mapRef: any = React.useRef();

  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: 103.8198,
    latitude: 1.3521,
    zoom: 10,
  });

  const options: { enableHighAccuracy: boolean; timeout: number } = {
    enableHighAccuracy: true,
    timeout: 5000,
  };

  const success = (pos: any): void => {
    // console.log(pos);

    const crd = pos.coords;
    setViewState({
      longitude: crd.longitude,
      latitude: crd.latitude,
      zoom: 16,
    });
  };

  const error = (err: any): void => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const [selectedCarpark, setSelectedCarpark] = React.useState<LotInfo | null>(
    null
  );

  const [toggleDisplayMarkers, setToggleDisplayMarkers] =
    React.useState<boolean>(false);

  const handleToggle = (): void => {
    setToggleDisplayMarkers(!toggleDisplayMarkers);
  };

  return (
    <>
      <div className="map">
        <ReactMapGL
          ref={mapRef}
          style={{
            width: "700px",
            height: "700px",
            border: "2px solid black",
          }}
          {...viewState}
          onMove={(event) => setViewState(event.viewState)}
          // initialViewState={{
          //   longitude: 103.8198,
          //   latitude: 1.3521,
          //   zoom: 10,
          // }}

          // mapboxAccessToken={TOKEN}
          mapboxAccessToken={mapboxToken}
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
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            showAccuracyCircle={false}
          />
          <NavigationControl />
        </ReactMapGL>
      </div>
      <button onClick={handleToggle}>Display Markers</button>
    </>
  );
}
