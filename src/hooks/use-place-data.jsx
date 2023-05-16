import { useEffect, useState } from "react";
import { fetchPlaces } from "../api/fetchPlaces";

export function usePlaceData() {
  // mock data, will get them from user input later
  const searchWord = "cafe";
  const proximity = "-0.1276, 51.5072";
  const navProfile = "walking";
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces(searchWord, proximity, navProfile).then((response) => {
      setPlaces(response);
    });
  }, [searchWord, proximity, navProfile]);

  return { places, setPlaces };
}
