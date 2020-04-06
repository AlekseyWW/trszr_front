import { useState } from "react";
import cx from 'classnames';

import css from './Input.module.css'
const Input = ({ value, name, label, bind }) => {
    
  return (
    <div className={css.input}>
      <input
        className={cx(css.field, {
          [css.value]: !!value,
        })}
        name={name}
        type="text"
        {...bind}
      />
      <label className={css.label}>{label}</label>
    </div>
  );
};

export default Input;