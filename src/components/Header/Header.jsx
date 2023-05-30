import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { fetchCoordinate } from "../../api/fetchCoordinate";
import styles from "./Header.module.css";

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
        travelMethod: "walking",
        travelTime: "15",
      });
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <select className={styles.select} name="searchPlace">
          <option>Cafe</option>
          <option>Pub</option>
          <option>Restaurant</option>
        </select>
        <input className={styles.searchBar} type="text" placeholder="Postcode" name="postcode" />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
