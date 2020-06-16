import { useContext } from 'react';
import cx from 'classnames';
import css from './Footer.module.css';
import PagesContext from '../../store';
import Container from '../Container';
import ContactBlock from '../ContactsBlock';
import FooterForm from '../Forms/FooterForm';
import Icon from '../Icon';
import Link from '../Link';
import { camelize } from '../Header';
import { defaultsPages } from "../Menu";

const Footer = () => {
  const { settings, sertificates, pages, categories } = useContext(PagesContext);
    
  return (
    <div className={css.root}>
      <Container>
        <div className={css.row}>
          <div className={cx(css.column, css.flex)}>
            <div className={css.list}>
              <a className={css.list__title}>
                <span>Страницы сайта</span>
              </a>
              <ul className={css.sublist}>
                {pages.map(({ title, slug }) => {
                  return (
                    <li key={slug}>
                      <Link
                        key={slug}
                        href={
                          defaultsPages.indexOf(slug) !== -1 ? slug : "/[slug]"
                        }
                        as={"/" + slug}
                        activeClassName={css.list__item_active}
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
            </div>
            {categories.map(({ name, slug: slugParent, children }) => {
              return (
                <div className={css.list}>
                  <Link
                    key={slugParent}
                    href="/cat/[category]"
                    as={"/cat/" + slugParent}
                    activeClassName={css.list__title}
                  >
                    <a className={css.list__title}>
                      <span> {name} </span>
                    </a>
                  </Link>
                  <ul className={css.sublist}>
                    {children.map(({ id, name, slug }) => {
                      return (
                        <li key={slug}>
                          <Link
                            href={`/cat/[category]?categories=${id}`}
                            as={`/cat/${slugParent}?categories=${id}`}
                            activeClassName={css.list__item_active}
                          >
                            <a className={css.list__item}>
                              <span> {name} </span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className={css.column}>
            <div className={css.list}>
              <div className={css.list__title}>
                <span className={css.logo}>Точка роста</span>
                <span className={css.logo_note}>Урожай в полную силу</span>
              </div>
              <div className={css.sublist}>
                <ContactBlock />
              </div>
            </div>
            
          </div>
        </div>
      </Container>
      <Container>
        <div className={css.copyright}>
          <p>Точка роста | 2020</p>
        </div>
      </Container>
    </div>
  );
}
export default Footer;