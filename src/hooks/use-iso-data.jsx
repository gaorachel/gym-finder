import { useContext, useEffect, useState } from "react";
import { fetchIsochrones } from "../api/fetchIsochrones";
import { SearchContext } from "../App";

export function useIsoData() {
  const [searchData] = useContext(SearchContext);
  const [isochrone, setIsochrone] = useState({});

  useEffect(() => {
    fetchIsochrones(searchData).then((response) => {
      setIsochrone(response);
    });
  }, [searchData]);

  return { isochrone, setIsochrone };
}
