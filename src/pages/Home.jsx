import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import Header from "../components/Header";
import ListReport from "../components/ListReport";
import PopUp from "../components/PopUp";
import style from "../css/home.module.css";
import Login from "./Login";
const Home = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [updateList, setUpdateList] = useState(0);
  const onClose = (reRender = false) => {
    setOpen(false);
    console.log("updateList", reRender);
    if (reRender) {
      setUpdateList(updateList + 1);
    }
  };
  const onOpen = () => {
    setOpen(true);
  };
  if (!user) {
    return <Login />;
  }

  return (
    <div className={style.home}>
      <Header />
      <button className={style.bLogout} onClick={logout}>
        Logout
      </button>
      <h1 className={style.title}>Generador de Reportes TK</h1>
      <ListReport key={updateList} />
      <div className={style.buttonDiv}>
        <Button onClick={onOpen}>Crear reporte</Button>
      </div>
      {open && <PopUp onClose={onClose}></PopUp>}
    </div>
  );
};
export default Home;
