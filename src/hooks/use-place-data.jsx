import { useContext, useEffect, useState } from "react";
import { fetchPlaces } from "../api/fetchPlaces";
import { SearchContext } from "../App";

export function usePlaceData() {
  const [searchData] = useContext(SearchContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces(searchData).then((response) => {
      setPlaces(response);
    });
  }, [searchData]);

  return { places, setPlaces };
}
