import axios from "axios";

export async function getCoordinate(postcode) {
  const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}?`);

  return response?.data;
}
