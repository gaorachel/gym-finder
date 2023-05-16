import axios from "axios";
import { isoCache } from "./isoCache";

export async function fetchIsochrones(searchData) {
  if (Object.keys(searchData).length === 0) return;

  //   const response = await axios.get(
  //     `https://api.mapbox.com/isochrone/v1/mapbox/${searchData.travelMethod}/${searchData.longitude},${searchData.latitude}?`,
  //     {
  //       params: {
  //         contours_minutes: searchData.travelTime,
  //         access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  //       },
  //     }
  //   );

  //   return response?.data;
  return isoCache;
}
