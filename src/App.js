import React, { createContext } from "react";
import { Header } from "./components/Header/Header";
import { MapContainer } from "./components/Main/Map";
import { PlaceList } from "./components/Sidebar/PlaceList";
import style from "./App.module.css";

export const PlaceContext = createContext(null);

export function App() {
  return (
    <div className={style.container}>
      <PlaceContext.Provider>
        <header className={style.header}>
          <Header />
        </header>

        <sidebar className={style.sidebar}>
          <PlaceList />
        </sidebar>

        <main className={style.main}>
          <MapContainer />
        </main>
      </PlaceContext.Provider>
    </div>
  );
}
