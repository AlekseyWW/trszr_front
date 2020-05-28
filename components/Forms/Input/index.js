import { useState } from "react";
import cx from 'classnames';
import { useInput } from "../../../hooks/input-hook";
import css from './Input.module.css'

const Input = ({ name, label, register, className, ...props }) => {
  const { value, bind, reset } = useInput("");
  console.log({props});
  
  return (
    <div className={cx(css.input, className)}>
      <input
        className={cx(css.field, {
          [css.value]: !!value,
        })}
        name={name}
        type="text"
        {...bind}
        ref={register}
      />
      <label className={css.label}>{label}</label>
    </div>
  );
};

export default Input;