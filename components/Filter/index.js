import FilterItem from "./FilterItem";
import FilterItemPicture from "./FilterItemPicture";
import cx from 'classnames';
import css from './Filter.module.css';

const Filter = ({pictured, lines}) => <div className={css.filter}>
    <div className={css.line}>
        {pictured.map((item, id) => <FilterItemPicture key={`item-${id}`} {...item} />)}
    </div>
    <div className={cx(css.line, css.line_gray)}>
        {lines.map((item, id) => <FilterItem key={`item-${id}`} {...item} />)}
    </div>
</div>

export default Filter;