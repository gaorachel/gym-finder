import React, { useContext } from "react";
import { SearchContext } from "../../App";
import styles from "./Main.module.css";

export function TravelInfoToggle() {
  const [searchData, setSearchData] = useContext(SearchContext);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      travelMethod: e.currentTarget.elements.travelMethod.value,
      travelTime: e.currentTarget.elements.travelTime.value,
    });
  };

  console.log(searchData);

  return (
    <form method="post" onChange={handleChange}>
      <div className={styles.travelSection}>
        {/* <div>Travel Method:</div>  */}
        <label>
          <input type="radio" value="walking" name="travelMethod" defaultChecked={true} />
          Walking
        </label>
        <label>
          <input type="radio" value="cycling" name="travelMethod" /> Cycling
        </label>
        <label>
          <input type="radio" value="driving" name="travelMethod" /> Driving
        </label>
      </div>

      <div className={styles.travelSection}>
        {/* <div>Travel Time: </div> */}
        <label>
          <input type="radio" value="5" name="travelTime" defaultChecked={true} />5 mins
        </label>
        <label>
          <input type="radio" value="15" name="travelTime" /> 15 mins
        </label>
        <label>
          <input type="radio" value="30" name="travelTime" /> 30 mins
        </label>
      </div>
    </form>
    // </form>
  );
}
