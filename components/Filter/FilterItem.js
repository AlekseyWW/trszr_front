import css from "./Filter.module.css";
import cx from "classnames";

const FilterItem = ({ name, id, onChange, type, isActive }) => (
  <button
    className={cx(css.item, css.item_line, { [css.item_active]: isActive })}
    onClick={onChange}
    value={id}
    name={type}
  >
    <span className={cx(css.title, css.title_line)}>{name}</span>
  </button>
);

export default FilterItem;
