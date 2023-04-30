import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { fetchCityAndPlaces } from "../../api/fetchCityAndPlaces";
import style from "./Map.module.css";

export function Map() {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLat] = useState(-0.1276);
  const [lat, setLng] = useState(51.5072); // [-0.1276, 51.5072] is London
  const [zoom, setZoom] = useState(13);
  const [places, setPlaces] = useState([]);

  const searchWord = "cafe";
  const proximity = `${lng},${lat}`;
  const navProfile = "walking";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    fetchCityAndPlaces(searchWord, proximity, navProfile).then((response) => {
      setPlaces(response);
    });
  }, [searchWord, proximity, navProfile]);

  places?.features?.forEach((place, i) => {
    place.properties.id = i;
  });

  map.current?.on("load", () => {
    map.current.addLayer({
      id: "locations",
      type: "circle",
      source: {
        type: "geojson",
        data: places,
      },
    });
  });

  return <div ref={mapContainer} className={style.mapContainer} />;
}
