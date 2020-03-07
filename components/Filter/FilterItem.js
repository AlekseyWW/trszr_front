import css from "./Filter.module.css";
import cx from "classnames";

const FilterItem = ({ title }) => (
  <div className={cx(css.item, css.item_line)}>
    <span className={cx(css.title, css.title_line)}>{title}</span>
  </div>
);

export default FilterItem;
