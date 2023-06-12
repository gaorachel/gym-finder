import { ChangeEvent, useContext } from "react";
import { SearchContext } from "../../App";
import { MdDirectionsWalk, MdDirectionsBike, MdDirectionsCar } from "react-icons/md";
import styles from "./TravelInfoToggle.module.css";

export function TravelInfoToggle() {
  const [searchData, setSearchData] = useContext(SearchContext);

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    const travelMethod = (e.currentTarget.elements.namedItem("travelMethod") as HTMLInputElement).value as
      | "walking"
      | "cycling"
      | "driving";
    const travelTime = (e.currentTarget.elements.namedItem("travelMethod") as HTMLInputElement).value as
      | "5"
      | "15"
      | "30";

    setSearchData({
      ...searchData,
      travelMethod: travelMethod || "walking",
      travelTime: travelTime || "15",
    });
  };

  if (!searchData.postcode) return null;

  return (
    <div className={styles.travelInfo}>
      <form method="post" onChange={handleChange}>
        <div className={styles.radios}>
          <div> Travel Method: </div>
          <label>
            <input className={styles.radio} type="radio" value="walking" name="travelMethod" />
            <MdDirectionsWalk
              className={styles.icon}
              style={{
                color: searchData.travelMethod === "walking" ? "var(--blue-1)" : "var(--grey-3)",
              }}
            />
          </label>
          <label>
            <input className={styles.radio} type="radio" value="cycling" name="travelMethod" />
            <MdDirectionsBike
              className={styles.icon}
              style={{ color: searchData.travelMethod === "cycling" ? "var(--blue-1)" : "var(--grey-3)" }}
            />
          </label>
          <label>
            <input className={styles.radio} type="radio" value="driving" name="travelMethod" />
            <MdDirectionsCar
              className={styles.icon}
              style={{ color: searchData.travelMethod === "driving" ? "var(--blue-1)" : "var(--grey-3)" }}
            />
          </label>
        </div>

        <div className={styles.radios}>
          <div> Travel Time: </div>
          <div className={styles.timeList}>
            <label
              className={styles.time}
              style={{
                color: searchData.travelTime === "5" ? "var(--blue-1)" : "var(--grey-3)",
              }}
            >
              <input className={styles.radio} type="radio" value="5" name="travelTime" />5 mins
            </label>
            <label
              className={styles.time}
              style={{
                color: searchData.travelTime === "15" ? "var(--blue-1)" : "var(--grey-3)",
              }}
            >
              <input className={styles.radio} type="radio" value="15" name="travelTime" />
              15 mins
            </label>

            <label
              className={styles.time}
              style={{
                color: searchData.travelTime === "30" ? "var(--blue-1)" : "var(--grey-3)",
              }}
            >
              <input className={styles.radio} type="radio" value="30" name="travelTime" />
              30 mins
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
