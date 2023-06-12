/* eslint-disable import/no-webpack-loader-syntax */
import { useContext, useState } from "react";
import { SearchContext, PlaceContext } from "../../App";
import Map, { Source, Layer, Marker, Popup } from "react-map-gl";
import { usePlaceData } from "../../hooks/use-place-data";
import { useIsoData } from "../../hooks/use-iso-data";
import { ReactComponent as LocationPin } from "./location-pin.svg";
import mapboxgl from "mapbox-gl";

import type { Feature } from "maplibre-gl";

type MapViewType = {
  longitude: number;
  latitude: number;
  zoom?: 13;
};

// @ts-ignore
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export function MapContainer() {
  const [searchData] = useContext(SearchContext);
  const [clickedPlace] = useContext(PlaceContext);

  const { places } = usePlaceData();
  const { isochrone } = useIsoData();

  const [mapView, setMapView] = useState<MapViewType>({
    longitude: -0.08763,
    latitude: 51.50821, // coordinate of London Bridge, London, UK.
    zoom: 13,
  });

  const [clickedMarker, setClickedMarker] = useState<Feature | null>();

  const clickedStyle = {
    fill: "var(--yellow-1)",
    height: 35,
    cursor: "pointer",
  } as const;

  const regularStyle = {
    fill: "var(--blue-1)",
    height: 30,
    cursor: "pointer",
  } as const;

  const isochroneStyle = {
    id: "iso",
    type: "fill",
    paint: {
      "fill-color": "#1c59a7",
      "fill-opacity": 0.25,
    },
  } as const;

  if (Number.isNaN(searchData.latitude) || Number.isNaN(searchData.longitude))
    return <Map {...mapView} mapStyle="mapbox://styles/mapbox/light-v11" />;

  return (
    <Map
      {...mapView}
      onData={() => {
        setMapView({
          longitude: searchData.longitude,
          latitude: searchData.latitude,
        });
      }}
      onMove={() => {
        // @ts-expect-error Forcing to re-render, else it won't move
        setMapView(null);
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {places?.features?.map((feature) => {
        return (
          <Marker
            key={feature?.properties?.mapbox_id}
            longitude={feature?.properties?.coordinates?.longitude}
            latitude={feature?.properties?.coordinates?.latitude}
            onClick={() => setClickedMarker(feature)}
          >
            <LocationPin
              style={
                clickedPlace?.properties?.mapbox_id === feature?.properties?.mapbox_id ? clickedStyle : regularStyle
              }
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
            {clickedMarker?.properties?.address} {clickedMarker?.properties?.context?.postcode?.name}
          </div>
        </Popup>
      )}

      <Source id="isochrone-data" type="geojson" data={isochrone}>
        <Layer {...isochroneStyle} />
      </Source>
    </Map>
  );
}
