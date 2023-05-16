import React, { useRef, useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import { usePlaceData } from "../../hooks/use-place-data";

export function MapContainer() {
  //   mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const [mapView, setMapView] = useState({
    longitude: -0.1276,
    latitude: 51.5072, // [-0.1276, 51.5072] is London
    zoom: 13,
  });
  const { places, setPlaces } = usePlaceData({});

  const placeLocatorStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  };

  return (
    <Map
      {...mapView}
      onMove={(newCoordinate) => {
        setMapView(newCoordinate);
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      <Source id="place-data" type="geojson" data={places}>
        <Layer {...placeLocatorStyle} />
      </Source>
    </Map>
  );
}
