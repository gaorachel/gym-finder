import { useContext, useEffect, useState } from "react";
import { fetchPlaces } from "../api/fetchPlaces";
import { SearchContext } from "../App";

import type { PlacesType } from "../types";

export function usePlaceData() {
  const [searchData] = useContext(SearchContext);
  const [places, setPlaces] = useState<PlacesType>();

  useEffect(() => {
    fetchPlaces(searchData).then((response) => {
      setPlaces(response);
    });
  }, [searchData]);

  return { places, setPlaces };
}
