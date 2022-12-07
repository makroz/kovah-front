import style from "../css/button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={style.button}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
