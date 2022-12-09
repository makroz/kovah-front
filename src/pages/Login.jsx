import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import style from "../css/popup.module.css";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = (props) => {
  const { data, error, loaded, execute } = useAxios();
  const { user, login } = useAuth();
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    handleDisabled({ ...formState, [name]: value });
  };

  const validaciones = () => {
    let errors = {};
    if (!formState.email) {
      errors = { ...errors, title: "Email es obligatorio" };
    }

    if (!formState.password) {
      errors = { ...errors, password: "Password es obligatorio" };
    }

    return errors;
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validaciones();
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    login(formState).then((data) => {
      console.log("====================================");
      console.log("login", data);
      console.log("====================================");

      if (data.user) {
        window.location = "/";
        return;
      } else {
        const err = data.errors;
        setErrors({ ...errors, ...err });
        console.log("====================================");
        console.log("Error", data.errors);
        console.log("====================================");
      }
    });
  };

  const handleDisabled = (state) => {
    setDisabled(!state.email || !state.password || !loaded);
  };

  return (
    <>
      <div className={style.popover}></div>
      <div className={style.modalframe}>
        <div className={style.modal}>
          <h1> Login</h1>
          <h2>Ingresa sus credenciales</h2>
          <Input
            label="Email"
            type="text"
            name="email"
            error={errors}
            value={formState.email}
            onChange={(e) => handleChange(e)}
          ></Input>
          <h3>Fecha de nacimiento</h3>
          <div className={style.half}>
            <Input
              label="Password"
              type="password"
              name="password"
              error={errors}
              value={formState.password}
              onChange={(e) => handleChange(e)}
            ></Input>
          </div>
          <div className={style.buttonDiv}>
            <Button disabled={disabled} onClick={(e) => handleSubmit(e)}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
