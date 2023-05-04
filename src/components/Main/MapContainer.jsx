import React, { useContext, useState } from "react";
import { SearchContext } from "../../App";
import Map, { Source, Layer, Marker } from "react-map-gl";
import { usePlaceData } from "../../hooks/use-place-data";
import { useIsoData } from "../../hooks/use-iso-data";
import styles from "./MapContainer.module.css";

export function MapContainer() {
  const [searchData] = useContext(SearchContext);

  const [mapView, setMapView] = useState({
    longitude: -0.08763,
    latitude: 51.50821, // coordinate of London Bridge, London, UK.
    zoom: 8,
  });

  const { places } = usePlaceData({});
  const { isochrone } = useIsoData({});

  const placeLocatorStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  };

  const isochroneStyle = {
    id: "iso",
    type: "fill",
    paint: {
      "fill-color": "#5a3fc0",
      "fill-opacity": 0.3,
    },
  };

  // const markerStyle = {
  //   id: "iso",
  //   type: "fill",
  //   paint: {
  //     "fill-color": "#5a3fc0",
  //     "fill-opacity": 0.3,
  //   },
  // };

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

      <Source id="isochrone-data" type="geojson" data={isochrone}>
        <Layer {...isochroneStyle} />
      </Source>
      {/* 
      <Marker longitude={-0.018583} latitude={51.50307}>
        <Layer {...markerStyle} />
      </Marker> */}
    </Map>
  );
}

// "latitude": 51.508482,
// "longitude": -0.126291,
// "longitude": -0.018583,
// "latitude": 51.50307,
