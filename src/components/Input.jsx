import style from "../css/input.module.css";

const Input = (props) => {
  const classDate = props.type == "date" ? style.date : "";
  return (
    <div className={style.div}>
      <label htmlFor={props.name} className={classDate}>
        {props.label}
      </label>
      <input
        className={classDate}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder || ""}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.type === "date" && (
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.2292 2H17.2292V0H15.2292V2H5.22925V0H3.22925V2H2.22925C1.12925 2 0.229248 2.9 0.229248 4V20C0.229248 21.1 1.12925 22 2.22925 22H18.2292C19.3292 22 20.2292 21.1 20.2292 20V4C20.2292 2.9 19.3292 2 18.2292 2ZM18.2292 20H2.22925V9H18.2292V20ZM18.2292 7H2.22925V4H18.2292V7Z"
            fill="#545454"
          />
        </svg>
      )}

      <p
        className={
          props.error[props.name]
            ? style.error
            : props.message
            ? style.success
            : ""
        }
      >
        {props.error[props.name] || props.message || null} &nbsp;
      </p>
    </div>
  );
};

export default Input;
