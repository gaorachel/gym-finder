import React, { createContext, useState } from "react";
import { SearchInfo } from "./components/Header/Header";
import { MapContainer } from "./components/Main/Map";
import { PlaceList } from "./components/Sidebar/PlaceList";
import style from "./App.module.css";

export const SearchContext = createContext({
  searchPlace: "",
  postcode: "",
  longitude: NaN,
  latitude: NaN,
  navProfile: "",
});

export function App() {
  const [searchData, setSearchData] = useState({});

  return (
    <div className={style.container}>
      <SearchContext.Provider value={[searchData, setSearchData]}>
        <header className={style.header}>
          <SearchInfo />
        </header>

        <aside className={style.sidebar}>
          <PlaceList />
        </aside>

        <main className={style.main}>
          <MapContainer />
        </main>
      </SearchContext.Provider>
    </div>
  );
}
