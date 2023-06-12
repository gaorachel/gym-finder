import { FormEvent, useContext } from "react";
import { SearchContext } from "../../App";
import { fetchCoordinate } from "../../api/fetchCoordinate";
import styles from "./Header.module.css";

import type { SearchContextType } from "../../types";

type FormJsonType = {
  searchPlace: string;
  postcode: string;
};

type CoordinateResponseType = {
  result: {
    longitude: number;
    latitude: number;
  };
};

export function Header(): JSX.Element {
  const [, setSearchData] = useContext<SearchContextType>(SearchContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJson: FormJsonType = {
      searchPlace: formData.get("searchPlace") as string,
      postcode: formData.get("postcode") as string,
    };

    formJson.postcode = formJson.postcode.replace(/\s/g, "");

    fetchCoordinate(formJson.postcode).then((response: CoordinateResponseType) => {
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
