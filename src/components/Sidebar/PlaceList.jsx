import { useContext, useState } from "react";
import { usePlaceData } from "../../hooks/use-place-data";
import { PlaceContext, SearchContext } from "../../App";
import { IoLocationSharp } from "react-icons/io5";
import classNames from "classnames";
import styles from "./PlaceList.module.css";

export function PlaceList() {
  const { places } = usePlaceData({});
  const [searchData] = useContext(SearchContext);
  const [clickedPlace, setClickedPlace] = useContext(PlaceContext);

  if (Object.keys(searchData).length === 0) return <div className={styles.blankList} />;

  return (
    <div className={styles.placeList}>
      {places?.features?.map((place) => {
        const isClicked = clickedPlace?.properties?.mapbox_id === place?.properties?.mapbox_id;
        return (
          <div
            className={classNames(styles.placeContainer, {
              [styles.highlighted]: isClicked,
            })}
            onClick={() => {
              setClickedPlace(place);
            }}
            key={place.properties.mapbox_id}
          >
            <div className={styles.placeName}>{place.properties.name}</div>
            <div className={styles.placeAddress}>
              <IoLocationSharp className={styles.placeLocator} />
              {place.properties.address}
              {" | "}
              {place.properties.context.postcode?.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
