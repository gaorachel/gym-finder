import { useContext } from "react";
import { usePlaceData } from "../../hooks/use-place-data";
import { SearchContext } from "../../App";
import styles from "./PlaceList.module.css";

export function PlaceList() {
  const { places, setPlaces } = usePlaceData({});
  const [searchData] = useContext(SearchContext);

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
              // place.properties.coordinates;
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
