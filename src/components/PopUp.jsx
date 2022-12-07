import { useState } from "react";
import style from "../css/popup.module.css";
import Button from "./Button";
import Input from "./Input";

const PopUp = (props) => {
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    title: "",
    date_from: "",
    date_to: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const validaciones = () => {
    let errors = {};
    // if (!formState.login_id) {
    //   errors = { ...errors, login_id: "El email es obligatorio" };
    // } else {
    //   if (!/\S+@\S+\.\S+/.test(formState.login_id)) {
    //     errors = { ...errors, login_id: "El email no es válido" };
    //   }
    // }
    // if (!formState.password) {
    //   errors = { ...errors, password: "La contraseña es obligatoria" };
    // }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validaciones();
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // try {
    //   const { data: user } = await login(formState).unwrap();
    //   dispatch(
    //     setCredentials({
    //       user: user?.user,
    //       token: user?.token,
    //     })
    //   );
    //   router.push("/");
    // } catch (err: any) {
    //   if (err.status === 404) {
    //     setErrors({
    //       ...errors,
    //       login_id: "Datos Incorrectos",
    //       password: "No autorizado",
    //     });
    //     dispatch(
    //       showToast({
    //         message: "Datos Incorrectos",
    //         type: "error",
    //         timer: 2000,
    //       })
    //     );
    //   }
    //   console.log("error", err);
    // }
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className={style.popover}></div>
      <div className={style.modalframe} onClick={props.onClose}>
        <div className={style.modal} onClick={handleClick}>
          <h1> Reporte por fecha de nacimiento</h1>
          <h2>Ingresa los siguientes datos para generar tu reporte</h2>
          <Input
            label="Descripción del reporte"
            type="text"
            name="title"
            error={errors}
            value={formState.title}
            onChange={(e) => handleChange(e)}
          ></Input>
          <h3>Fecha de nacimiento</h3>
          <div className={style.half}>
            <Input
              label="Inicio"
              type="date"
              name="date_from"
              error={errors}
              value={formState.date_from}
              onChange={(e) => handleChange(e)}
            ></Input>
            <Input
              label="Fin"
              type="date"
              name="date_to"
              error={errors}
              value={formState.date_to}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <div className={style.buttonDiv}>
            <Button disabled={true}>Generar reporte</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
