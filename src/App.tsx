import { createContext, useState } from "react";
import { Header } from "./components/Header/Header";
import { PlaceList } from "./components/Sidebar/PlaceList";
import { MapProvider } from "react-map-gl";
import { Main } from "./components/Main/Main";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./App.module.css";

import type { SearchContextType, PlaceContextType, SearchDataType } from "./types";
import type { Feature } from "maplibre-gl";

export const SearchContext = createContext<SearchContextType>([
  {
    searchPlace: "",
    postcode: "",
    longitude: NaN,
    latitude: NaN,
    travelMethod: "walking",
    travelTime: "15",
  },
  () => {},
]);

export const PlaceContext = createContext<PlaceContextType>([null, () => {}]);

export function App() {
  const [searchData, setSearchData] = useState<SearchDataType>({
    searchPlace: "",
    postcode: "",
    longitude: NaN,
    latitude: NaN,
    travelMethod: "walking",
    travelTime: "15",
  });

  const [clickedPlace, setClickedPlace] = useState<Feature | null>(null);

  return (
    <MapProvider>
      <div className={styles.container}>
        <SearchContext.Provider value={[searchData, setSearchData]}>
          <header className={styles.header}>
            <Header />
          </header>
          <PlaceContext.Provider value={[clickedPlace, setClickedPlace]}>
            <aside className={styles.sidebar}>
              <PlaceList />
            </aside>

            <main className={styles.main}>
              <Main />
            </main>
          </PlaceContext.Provider>
        </SearchContext.Provider>
      </div>
    </MapProvider>
  );
}
