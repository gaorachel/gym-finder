import axios from "axios";

import type { PlacesType, SearchDataType } from "../types";

export async function fetchPlaces(searchData: SearchDataType) {
  if (Number.isNaN(searchData.latitude) || Number.isNaN(searchData.longitude)) return;

  const response = await axios.get<PlacesType>(
    `https://api.mapbox.com/search/searchbox/v1/category/${searchData.searchPlace}?`,
    {
      params: {
        access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        limit: 25, // max number of results can be retrieved
        proximity: `${searchData.longitude},${searchData.latitude}`,
        origin: `${searchData.longitude},${searchData.latitude}`,
        navigation_profile: searchData.travelMethod,
        time_deviation: searchData.travelTime,
      },
    }
  );

  return response?.data;
}
