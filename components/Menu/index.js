import { Transition } from 'react-transition-group';
import css from './Menu.module.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cx from 'classnames';
import SearchForm from '../Forms/SearchForm';
import Link from '../Link';
import Icon from '../Icon';
import { camelize } from '../Header';
import { useEffect, useRef, useContext } from "react";
import PagesContext from '../../store';
import Hamburger from '../Hamburger';
const duration = 350;

const defaultStyle = {
  transition: `transform ${duration}ms, opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
export const defaultsPages = ["kontakty", "about"];
const transitionStyles = {
    entering: css.entering,
    entered: css.entered,
    exiting: css.exiting,
    exited: css.exited,
};
const transitionHamburgerStyles = {
    entering: css.h_entering,
    entered: css.h_entered,
    exiting: css.h_exiting,
    exited: css.h_exited,
};

const Menu = ({ in: inProp, toggleMenu, categories, cultures }) => {
  const el = useRef();
  const { pages } = useContext(PagesContext);
  
  useEffect(() => {
    if (inProp) {
      disableBodyScroll(el.current)
    } else {
      enableBodyScroll(el.current)
    }
  }, [inProp]);
  
  return (<>
    <Transition in={inProp} timeout={!inProp ? duration : 0}>
      {(state) => <Hamburger className={cx(css.hamburger, transitionHamburgerStyles[state])} toggleMenu={toggleMenu} isOpen={inProp} />}
    </Transition>
    <Transition in={inProp} unmountOnExit timeout={!inProp ? duration : 0}>
      {(state) => (
        <div className={cx(css.root, transitionStyles[state])} onClick={toggleMenu}>
          <div className={css.inner} ref={el}>
            {/* <SearchForm className={css.search} /> */}
            <ul className={cx(css.list, css.list_page)}>
              {pages.filter(el => el.in_menu).map(({ title, slug }) => {
                return (
                  <li key={slug}>
                    <Link
                      onClick={toggleMenu}
                      key={slug}
                      href={defaultsPages.indexOf(slug) !== -1 ? slug : "/[slug]"}
                      as={"/" + slug}
                      activeClassName={css.list__item_active}
                    >
                      <a className={cx(css.list__item, css.list__item_page)}>
                        {slug && (
                          <Icon name={camelize(slug)} className={css.icon} />
                        )}
                        <span> {title} </span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className={css.list}>
              {categories.map(({ name, slug: slugParent, children }) => {
                return (
                  <li key={slugParent}>
                    <Link
                      onClick={toggleMenu}
                      key={slugParent}
                      href="/cat/[category]"
                      as={"/cat/" + slugParent}
                      activeClassName={css.list__item_active}
                    >
                      <a className={css.list__item}>
                        {slugParent && (
                          <Icon
                            name={camelize(slugParent)}
                            className={css.icon}
                          />
                        )}
                        <span> {name} </span>
                      </a>
                    </Link>
                    <ul className={css.sublist}>
                      {children.map(({ id, name, slug }) => {
                        return (
                          <li key={slug}>
                            <Link
                              onClick={toggleMenu}
                              href={`/cat/[category]?categories=${id}`}
                              as={`/cat/${slugParent}?categories=${id}`}
                              activeClassName={css.list__item_active}
                            >
                              <a className={css.list__item}>
                                {slug && (
                                  <Icon
                                    name={camelize(slug)}
                                    className={css.icon}
                                  />
                                )}
                                <span> {name} </span>
                              </a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Transition>
  </>);};

export default Menu;