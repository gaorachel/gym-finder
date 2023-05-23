import React, { useContext, useState } from "react";
import { SearchContext } from "../../App";
import { PlaceContext } from "../../App";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import { usePlaceData } from "../../hooks/use-place-data";
import { useIsoData } from "../../hooks/use-iso-data";
import { ReactComponent as LocationPin } from "./location-pin.svg";
import styles from "./MapContainer.module.css";

export function MapContainer() {
  const [searchData] = useContext(SearchContext);
  const [clickedPlace] = useContext(PlaceContext);

  const { places } = usePlaceData({});
  const { isochrone } = useIsoData({});

  const [mapView, setMapView] = useState({
    longitude: -0.08763,
    latitude: 51.50821, // coordinate of London Bridge, London, UK.
    zoom: 13,
  });

  const [clickedMarker, setClickedMarker] = useState(null);

  const placeLocatorStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#1c59a7",
    },
  };

  const isochroneStyle = {
    id: "iso",
    type: "fill",
    paint: {
      "fill-color": "#1c59a7",
      "fill-opacity": 0.3,
    },
  };

  const clickedPlaceStyle = {
    id: "big-point",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#fec20c",
    },
  };

  const clicked = {
    fill: "var(--yellow-1)",
    height: 30,
    cursor: "pointer",
  };

  const regular = {
    fill: "var(--blue-2)",
    height: 30,
    cursor: "pointer",
  };

  if (Object.keys(searchData).length === 0) return <Map {...mapView} mapStyle="mapbox://styles/mapbox/light-v11" />;

  return (
    <Map
      {...mapView}
      onData={() => {
        setMapView({
          longitude: searchData.longitude,
          latitude: searchData.latitude,
        });
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      {/* <Source id="place-data" type="geojson" data={places}>
        <Layer {...placeLocatorStyle} />
      </Source> */}

      {places?.features?.map((feature) => {
        return (
          <Marker
            key={feature?.properties?.mapbox_id}
            longitude={feature?.properties?.coordinates?.longitude}
            latitude={feature?.properties?.coordinates?.latitude}
            onClick={() => setClickedMarker(feature)}
          >
            <LocationPin
              style={clickedPlace?.properties?.mapbox_id === feature?.properties?.mapbox_id ? clicked : regular}
            />
          </Marker>
        );
      })}

      {clickedMarker && (
        <Popup
          longitude={clickedMarker.properties.coordinates.longitude}
          latitude={clickedMarker.properties.coordinates.latitude}
          closeOnClick={false}
          onClose={() => setClickedMarker(null)}
        >
          <div>{clickedMarker.properties.name}</div>
          <div>
            {clickedMarker.properties.address} {clickedMarker.properties.context.postcode.name}
          </div>
        </Popup>
      )}

      <Source id="isochrone-data" type="geojson" data={isochrone}>
        <Layer {...isochroneStyle} />
      </Source>
      {/* <Source id="clicked-place-data" type="geojson" data={clickedPlace}>
        <Layer {...clickedPlaceStyle} />
      </Source> */}
    </Map>
  );
}
