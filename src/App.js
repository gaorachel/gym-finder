import { Header } from "./components/Header/Header";
import { Map } from "./components/Main/Map";
import style from "./App.module.css";

export function App() {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Header />
      </header>
      <aside className={style.sidebar}>Sidebar</aside>
      <main className={style.main}>
        <Map />
      </main>
    </div>
  );
}
