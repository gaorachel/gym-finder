import { useEffect, useState } from "react";
import { fetchPlaces } from "../api/fetchPlaces";

export function useCoordinate() {
  const [coordinate, setCoordinate] = useState([]);

  useEffect(() => {
    setCoordinate(coordinate);
  }, [coordinate]);

  return { coordinate, setCoordinate };
}
