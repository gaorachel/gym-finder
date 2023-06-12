import axios, { isAxiosError } from "axios";

import type { SearchDataType } from "../types";
import type { GeoJSONFeature } from "maplibre-gl";

export async function fetchIsochrones(searchData: SearchDataType) {
  if (Number.isNaN(searchData.latitude) || Number.isNaN(searchData.longitude)) return;

  try {
    const response = await axios.get<GeoJSONFeature>(
      `https://api.mapbox.com/isochrone/v1/mapbox/${searchData.travelMethod}/${searchData.longitude},${searchData.latitude}?`,
      {
        params: {
          contours_minutes: searchData.travelTime,
          access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        },
      }
    );
    return response?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      alert(`${error?.response?.data.message}, but now it is ${searchData.latitude}.`);
    }
  }
}
