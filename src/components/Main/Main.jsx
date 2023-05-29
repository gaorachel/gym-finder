import { TravelInfoToggle } from "./TravelInfoToggle";
import { MapContainer } from "./MapContainer";
import styles from "./Main.module.css";

export function Main() {
  return (
    <div>
      <TravelInfoToggle />
      <div className={styles.map}>
        <MapContainer />
      </div>
    </div>
  );
}
