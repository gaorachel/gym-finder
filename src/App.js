import React, { createContext, useState } from "react";
import { Header } from "./components/Header/Header";
import { MapContainer } from "./components/Main/MapContainer";
import { PlaceList } from "./components/Sidebar/PlaceList";
import { MapProvider } from "react-map-gl";
import style from "./App.module.css";

export const SearchContext = createContext({
  searchPlace: "",
  postcode: "",
  longitude: NaN,
  latitude: NaN,
  travelMethod: "",
  travelTime: NaN,
});

export const PlaceContext = createContext({
  name: "",
  coordinate: "",
});

export function App() {
  const [searchData, setSearchData] = useState({});
  const [clickedPlace, setClickedPlace] = useState({});

  return (
    <MapProvider>
      <div className={style.container}>
        <SearchContext.Provider value={[searchData, setSearchData]}>
          <header className={style.header}>
            <Header />
          </header>
          <PlaceContext.Provider value={[clickedPlace, setClickedPlace]}>
            <aside className={style.sidebar}>
              <PlaceList />
            </aside>

            <main className={style.main}>
              <MapContainer />
            </main>
          </PlaceContext.Provider>
        </SearchContext.Provider>
      </div>
    </MapProvider>
  );
}
