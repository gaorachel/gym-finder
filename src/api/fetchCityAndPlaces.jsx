import axios from "axios";

export async function fetchCityAndPlaces(searchWord = "cafe", proximity, navProfile = "walking") {
  const response = await axios.get(`https://api.mapbox.com/search/searchbox/v1/category/${searchWord}?`, {
    params: {
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      limit: 25, // max number of results can be retrieved
      proximity,
      navigation_profile: navProfile,
    },
  });

  console.log(response?.data?.features);
  return response?.data;
}
