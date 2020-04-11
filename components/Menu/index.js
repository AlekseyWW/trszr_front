import { Transition } from 'react-transition-group';
import css from './Menu.module.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cx from 'classnames';
import SearchForm from '../Forms/SearchForm';
import Link from '../Link';
import Icon from '../Icon';
import { camelize } from '../Header';
import { useEffect, useRef } from 'react';
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

const Menu = ({ in: inProp, toggleMenu, categories, cultures }) => {
  const el = useRef();

  useEffect(() => {
    console.log({ inProp }, el.current);
    
    if (inProp) {
      disableBodyScroll(el.current)
    } else {
      enableBodyScroll(el.current)
    }
  }, [inProp]);
  
  return (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div className={cx(css.root, transitionStyles[state])}>
        <div className={css.inner} ref={el} >
          <SearchForm />
          <ul className={css.list}>
            {categories.map(({name, slug: slugParent, children}) => {
              return <li>
                <Link
                  onClick={toggleMenu}
                  key={slugParent}
                  href="/[category]"
                  as={'/' + slugParent}
                  activeClassName={css.list__item_active}
                  shallow
                >
                  <a className={css.list__item}>
                    <span> {name} </span>
                    {slugParent && <Icon name={camelize(slugParent)} className={css.icon} />}
                  </a>
                </Link>
                <ul className={css.sublist}>
                {children.map(({ id, name, slug}) => {
                    return <li><Link
                      onClick={toggleMenu}
                      key={slug}
                      href={`/[category]?categories=${id}`}
                      as={`/${slugParent}?categories=${id}`}
                      activeClassName={css.list__item_active}
                      shallow
                    >
                      <a className={css.list__item}>
                        <span> {name} </span>
                        {slug && <Icon name={camelize(slug)} className={css.icon} />}
                      </a>
                    </Link></li>
                  })}
                </ul>
              </li>
            })}
          </ul>
          <ul className={css.list}>
            {cultures.map(({name, slug, children}) => {
              return <li>
                <Link
                  onClick={toggleMenu}
                  key={slug}
                  href="/[category]"
                  as={'/' + slug}
                  activeClassName={css.list__item_active}
                  shallow
                >
                  <a className={css.list__item}>
                    <span> {name} </span>
                    {slug && <Icon name={camelize(slug)} className={css.icon} />}
                  </a>
                </Link>
              </li>
            })}
          </ul>
        </div>
        <button onClick={toggleMenu} className={css.close}>
          <i></i>
          <i></i>
        </button>
      </div>
    )}
  </Transition>
)};

export default Menu;