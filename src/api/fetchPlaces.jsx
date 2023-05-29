import axios from "axios";
import { cache } from "./cache";

export async function fetchPlaces(searchData) {
  if (Object.keys(searchData).length === 0) return;

  const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/category/${searchData.searchPlace}?`, {
    params: {
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      limit: 25, // max number of results can be retrieveds
      proximity: `${searchData.longitude},${searchData.latitude}`,
      origin: `${searchData.longitude},${searchData.latitude}`,
      // route: "polyline6",
      // route_geometry: "polyline6",
      navigation_profile: searchData.travelMethod,
      time_deviation: searchData.travelTime,
    },
  });

  return response?.data;
  // return cache;
}
