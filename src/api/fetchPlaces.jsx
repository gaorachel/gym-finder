import axios from "axios";
import { cache } from "./cache";

export async function fetchPlaces(searchData) {
  if (Object.keys(searchData).length === 0) return;

  const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/category/${searchData.searchPlace}?`, {
    params: {
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      limit: 25, // max number of results can be retrieved
      proximity: `${searchData.longitude},${searchData.latitude}`,
      navigation_profile: searchData.navProfile,
    },
  });

  return response?.data;
  // return cache;
}
