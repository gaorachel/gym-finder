import { usePlaceData } from "../../hooks/use-place-data";
import styles from "./PlaceList.module.css";

export function PlaceList() {
  const { places, setPlaces } = usePlaceData({});
  let newCoordinate = [];

  const searchWord = "cafe";

  return (
    <div>
      <div className={styles.placeSummary}>
        {places?.features?.length} x {searchWord.toUpperCase()} FOUND
      </div>
      {places?.features?.map((place) => {
        return (
          <div
            className={styles.placeContainer}
            onClick={() => {
              newCoordinate = place.properties.coordinates;
            }}
          >
            <div className={styles.placeName} key={place.properties.mapbox_id + 1}>
              {place.properties.name}
            </div>
            <div className={styles.placeAddress} key={place.properties.mapbox_id + 2}>
              {place.properties.address} {place.properties.context.postcode?.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
