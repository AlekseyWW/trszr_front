import { Transition } from 'react-transition-group';
import css from './Menu.module.css';
import cx from 'classNames';
import SearchForm from '../Forms/SearchForm';
const duration = 300;

const defaultStyle = {
  transition: `transform ${duration}ms, opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
    entering: css.entering,
    entered: css.entered,
    exiting: css.exiting,
    exited: css.exited,
};

const Menu = ({ in: inProp, toggleMenu }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div className={cx(css.root, transitionStyles[state])}>
        <div className={css.inner}>
          <SearchForm />
        </div>
        <button onClick={toggleMenu} className={css.close}>
          <i></i>
          <i></i>
        </button>
      </div>
    )}
  </Transition>
);

export default Menu;