import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { getCoordinate } from "../../api/getCoordinate";

export function SearchInfo() {
  const [, setSearchData] = useContext(SearchContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    formJson.searchPlace = formJson.searchPlace.replaceAll(" ", "");
    formJson.postcode = formJson.postcode.replaceAll(" ", "");

    getCoordinate(formJson.postcode).then((response) => {
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
        <input type="radio" value="walking" name="navProfile" defaultChecked={true} /> Walking
      </label>
      <label>
        <input type="radio" value="driving" name="navProfile" /> Driving
      </label>
      <label>
        <input type="radio" value="cycling" name="navProfile" /> Cycling
      </label>
      <button type="submit"> Search </button>
    </form>
  );
}
