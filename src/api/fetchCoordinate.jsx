import axios from "axios";

export async function fetchCoordinate(postcode) {
  try {
    const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}?`);
    return response.data;
  } catch (error) {
    alert(`Postcode [${postcode}] is invalid! Please try again.`);
  }
}
