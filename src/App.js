import style from "./App.module.css";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className={style.container}>
      <Header className={style.header} />
      <sidebar className={style.sidebar}>Sidebar</sidebar>
      <main className={style.main}>Main</main>
    </div>
  );
}

export default App;
