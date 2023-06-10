import axios from "axios";
import { Feature } from "maplibre-gl";
import { SearchDataType } from "../types";

export async function fetchPlaces(searchData: SearchDataType) {
  if (Object.keys(searchData).length === 0) return;

  const response = await axios.get<Feature>(
    `https://api.mapbox.com/search/searchbox/v1/category/${searchData.searchPlace}?`,
    {
      params: {
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        limit: 25, // max number of results can be retrieveds
        proximity: `${searchData.longitude},${searchData.latitude}`,
        origin: `${searchData.longitude},${searchData.latitude}`,
        navigation_profile: searchData.travelMethod,
        time_deviation: searchData.travelTime,
      },
    }
  );

  return response?.data;
}
