import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { fetchCoordinate } from "../../api/fetchCoordinate";

export function Header() {
  const [, setSearchData] = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    formJson.postcode = formJson.postcode.replaceAll(" ", "");

    fetchCoordinate(formJson.postcode).then((response) => {
      setSearchData({
        ...formJson,
        longitude: response.result.longitude,
        latitude: response.result.latitude,
      });
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter a place you want to search" name="searchPlace" />
      <input type="text" placeholder="Enter the postcode of the area you want to search" name="postcode" />
      <label>
        <input type="radio" value="walking" name="travelMethod" defaultChecked={true} /> Walking
      </label>
      <label>
        <input type="radio" value="driving" name="travelMethod" /> Driving
      </label>
      <label>
        <input type="radio" value="cycling" name="travelMethod" /> Cycling
      </label>
      <label>
        <input type="radio" value="5" name="travelTime" defaultChecked={true} /> 5 mins
      </label>
      <label>
        <input type="radio" value="15" name="travelTime" /> 15 mins
      </label>
      <label>
        <input type="radio" value="30" name="travelTime" /> 30 mins
      </label>
      <button type="submit"> Search </button>
    </form>
  );
}
