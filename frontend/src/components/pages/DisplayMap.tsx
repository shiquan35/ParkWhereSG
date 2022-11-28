import * as React from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import carparkMarker from "./MarkerStyles/carparkMarker.png";
import GeocoderControl from "./GeocoderFiles/geocoder-control";
import { v4 as uuid } from "uuid";
import { List } from "./List";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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

  currLocation: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

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

export function DisplayMap({ lotInfo, currLocation }: IAppProps) {
  const mapRef: any = React.useRef();
  // console.log("lotInfo", lotInfo);

  const [viewState, setViewState] = React.useState<ViewState>({
    longitude: currLocation.longitude,
    latitude: currLocation.latitude,
    zoom: currLocation.zoom,
  });

  const [selectedCarpark, setSelectedCarpark] = React.useState<LotInfo | null>(
    null
  );

  selectedCarpark &&
    console.log("selected lat", Number(selectedCarpark.Location.split(" ")[0]));
  selectedCarpark &&
    console.log("selected lng", Number(selectedCarpark.Location.split(" ")[1]));

  return (
    <>
      <div className="container">
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
            mapboxAccessToken={TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {lotInfo.map(
              (lot) =>
                Math.sqrt(
                  (viewState.latitude - Number(lot.Location.split(" ")[0])) **
                    2 +
                    (viewState.longitude -
                      Number(lot.Location.split(" ")[1])) **
                      2
                ) <= 0.0035 && (
                  <Marker
                    key={uuid()}
                    latitude={Number(lot.Location.split(" ")[0])}
                    longitude={Number(lot.Location.split(" ")[1])}
                  >
                    <button
                      className="markerButton"
                      onMouseOver={(event) => {
                        event.preventDefault();
                        setSelectedCarpark(lot);
                      }}
                    >
                      <img src={carparkMarker} alt="Carpark" />
                    </button>
                  </Marker>
                )
            )}

            {selectedCarpark && (
              <Popup
                longitude={Number(selectedCarpark.Location.split(" ")[1])}
                latitude={Number(selectedCarpark.Location.split(" ")[0])}
                closeOnClick={false}
                onClose={() => setSelectedCarpark(null)}
              >
                <div
                  onMouseOut={(event) => {
                    event.preventDefault();
                    setSelectedCarpark(null);
                  }}
                >
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
            <GeocoderControl
              position="top-left"
              mapboxAccessToken={TOKEN}
              zoom={16}
            />
          </ReactMapGL>
        </div>
        <div className="listDiv">
          <List lotInfo={lotInfo} viewState={viewState} />
        </div>
      </div>
    </>
  );
}
