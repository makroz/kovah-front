import { useState } from "react";
import style from "../css/popup.module.css";
import Button from "./Button";
import Input from "./Input";

const PopUp = (props) => {
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [formState, setFormState] = useState({
    title: "",
    date_from: "",
    date_to: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    handleDisabled({ ...formState, [name]: value });
  };

  const validaciones = () => {
    const validaDate = (value, value2, ini = true) => {
      // const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
      const DATE_MIN = new Date(1980, 0, 1);
      const DATE_MAX = new Date(2010, 11, 31);
      if (!value) {
        return "Es obligatoria";
      }
      // if (!DATE_REGEX.test(value)) {
      //   return "no es valida";
      // }
      if (new Date(value) < DATE_MIN) {
        return "Debe ser mayor a " + DATE_MIN.toDateString();
      }
      if (new Date(value) > DATE_MAX) {
        return "Debe ser menor a " + DATE_MAX.toDateString();
      }
      if (ini && value2 && new Date(value) > new Date(value2)) {
        return "Debe ser menor a Fecha Fin ";
      }
      if (!ini && value2 && new Date(value) < new Date(value2)) {
        return "Debe ser mayor a Fecha Inicio ";
      }

      return false;
    };

    let errors = {};
    if (!formState.title) {
      errors = { ...errors, title: "Titulo es obligatorio" };
    }

    let dateTemp = false;
    dateTemp = validaDate(formState.date_from, formState.date_to);
    if (dateTemp) {
      errors = { ...errors, date_from: dateTemp };
    }
    dateTemp = validaDate(formState.date_to, formState.date_from, false);
    if (dateTemp) {
      errors = { ...errors, date_to: dateTemp };
    }

    return errors;
  };

  //
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

  const handleDisabled = (state) => {
    setDisabled(!state.title || !state.date_from || !state.date_to);
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
            <Button disabled={disabled} onClick={(e) => handleSubmit(e)}>
              Generar reporte
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
