import { useState, useEffect } from 'react';
import css from "./Filter.module.css";
import cx from "classnames";

const FilterItem = ({ name, id, onChange, type, isActive }) => {
  const [active, setActive] = useState(false);
  const onMouseUp = () => {
    setActive(false)
  }
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    }
  }, []);
  const onMouseDown = () => {
    setActive(true)
  }
  return (
    <button
      className={cx(css.item, css.item_line, { [css.item_active]: isActive, [css.item_press]: active })}
      onClick={onChange}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      value={id}
      name={type}
    >
      <span className={cx(css.title, css.title_line)}>{name}</span>
    </button>
  )
};

export default FilterItem;
