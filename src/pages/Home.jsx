import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import ListReport from "../components/ListReport";
import PopUp from "../components/PopUp";
import style from "../css/home.module.css";
const Home = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    setOpen(true);
  };
  return (
    <div>
      <Header />
      <h1 className={style.title}>Generador de Reportes TK</h1>
      <ListReport />
      <div className={style.buttonDiv}>
        <Button onClick={onClick}>Crear reporte</Button>
      </div>
      {open && <PopUp onClose={onClose}></PopUp>}
    </div>
  );
};
export default Home;
