import css from './Container.module.css';
import cx from 'classnames';

const Container = ({ children, className }) => (
  <div className={cx(css.container, className)}>{children}</div>
);

export default Container;