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
  const { pages } = useContext(PagesContext);
  console.log({ pages });
  
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
          <div className={css.inner} ref={el}>
            <SearchForm className={css.search} />
            <ul className={css.list}>
              {pages.map(({ title, slug }) => {
                return (
                  <li key={slug}>
                    <Link
                      onClick={toggleMenu}
                      key={slug}
                      href="/[slug]"
                      as={"/" + slug}
                      activeClassName={css.list__item_active}
                      prefetch={false}
                    >
                      <a className={cx(css.list__item, css.list__item_page)}>
                        <span> {title} </span>
                        {slug && (
                          <Icon name={camelize(slug)} className={css.icon} />
                        )}
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
                      prefetch={false}
                    >
                      <a className={css.list__item}>
                        <span> {name} </span>
                        {slugParent && (
                          <Icon
                            name={camelize(slugParent)}
                            className={css.icon}
                          />
                        )}
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
                              prefetch={false}
                            >
                              <a className={css.list__item}>
                                <span> {name} </span>
                                {slug && (
                                  <Icon
                                    name={camelize(slug)}
                                    className={css.icon}
                                  />
                                )}
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
            <ul className={css.list}>
              <li>
                <span className={css.list__item}>Культуры</span>
                <ul className={css.sublist}>
                  {cultures.map(({ name, slug, children }) => {
                    return (
                      <li key={name}>
                        <Link
                          onClick={toggleMenu}
                          href="/cat/[category]"
                          as={"/cat/" + slug}
                          activeClassName={css.list__item_active}
                          prefetch={false}
                        >
                          <a className={css.list__item}>
                            <span> {name} </span>
                            {slug && (
                              <Icon
                                name={camelize(slug)}
                                className={css.icon}
                              />
                            )}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
            <button onClick={toggleMenu} className={css.close}>
              <i></i>
              <i></i>
            </button>
          </div>
        </div>
      )}
    </Transition>
  );};

export default Menu;