import * as React from "react";
import { v4 as uuid } from "uuid";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import carparkMarker from "./MarkerStyles/carparkMarker.png";

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

export function DisplayMap({ lotInfo }: IAppProps) {
  const mapRef: any = React.useRef();
  console.log("lotInfo", lotInfo);

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
    const crd = pos.coords;
    setViewState({
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

  selectedCarpark &&
    console.log("selected lat", Number(selectedCarpark.Location.split(" ")[0]));
  selectedCarpark &&
    console.log("selected lng", Number(selectedCarpark.Location.split(" ")[1]));

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
          mapboxAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {toggleDisplayMarkers &&
            lotInfo.map(
              (lot) =>
                Math.sqrt(
                  (viewState.latitude - Number(lot.Location.split(" ")[0])) **
                    2 +
                    (viewState.longitude -
                      Number(lot.Location.split(" ")[1])) **
                      2
                ) <= 0.005 && (
                  <Marker
                    key={uuid()}
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
