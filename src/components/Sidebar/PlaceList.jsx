import { useContext, useState } from "react";
import { usePlaceData } from "../../hooks/use-place-data";
import { PlaceContext, SearchContext } from "../../App";
import styles from "./PlaceList.module.css";

export function PlaceList() {
  const { places } = usePlaceData({});
  const [searchData] = useContext(SearchContext);
  const [, setClickedPlace] = useContext(PlaceContext);

  if (Object.keys(searchData).length === 0) return <div className={styles.blankList} />;

  return (
    <div>
      <div className={styles.placeSummary}>
        {places?.features?.length} x {searchData?.searchPlace.toUpperCase()} FOUND
      </div>
      {places?.features?.map((place) => {
        return (
          <div
            className={styles.placeContainer}
            onClick={() => {
              setClickedPlace(place);
            }}
            key={place.properties.mapbox_id}
          >
            <div className={styles.placeName}>{place.properties.name}</div>
            <div className={styles.placeAddress}>
              {place.properties.address} {place.properties.context.postcode?.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
