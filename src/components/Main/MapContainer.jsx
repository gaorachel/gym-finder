import React, { useContext, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { usePlaceData } from "../../hooks/use-place-data";
import { SearchContext } from "../../App";
import styles from "./MapContainer.module.css";

export function MapContainer() {
  const [searchData] = useContext(SearchContext);

  const [mapView, setMapView] = useState({
    longitude: -0.08763,
    latitude: 51.50821, // coordinate of London Bridge, London, UK.
    zoom: 8,
  });

  const { places } = usePlaceData({});

  const placeLocatorStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  };

  if (Object.keys(searchData).length === 0) return <Map {...mapView} mapStyle="mapbox://styles/mapbox/light-v11" />;

  return (
    <Map
      {...mapView}
      onData={() => {
        setMapView({
          longitude: searchData.longitude,
          latitude: searchData.latitude,
          zoom: 13,
        });
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <Source id="place-data" type="geojson" data={places}>
        <Layer {...placeLocatorStyle} />
      </Source>
    </Map>
  );
}
