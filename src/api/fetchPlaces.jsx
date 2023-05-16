import axios from "axios";
import { cache } from "./cache";

export async function fetchPlaces(searchWord = "cafe", proximity = [-0.1276, 51.5072], navProfile = "walking") {
  // const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/category/${searchWord}?`, {
  //   params: {
  //     access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  //     limit: 25, // max number of results can be retrieved
  //     proximity,
  //     navigation_profile: navProfile,
  //   },
  // });

  // console.log(response?.data);
  // return response?.data;
  return cache;
}
