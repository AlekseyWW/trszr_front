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
      <Container className={css.container}>
       

        <div className={css.column}>
          <div className={css.sertificates}>
            {sertificates.map((item) => (
              <div className={css.sertificate}>
                <img src={`${process.env.api}/storage/${item.image}`} />
              </div>
            ))}
          </div>
        </div>
        <p className={css.logo}>
          <Icon name="icon" /> <Icon name="logo" />
        </p>
        <div className={css.row}>
          <div className={cx(css.column, css.flex)}>
            <ul className={css.list}>
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
                      prefetch={true}
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
            <ul className={cx(css.list, css.categories)}>
              {categories.map(({ name, slug: slugParent, children }) => {
                return (
                  <li key={slugParent}>
                    <Link
                      key={slugParent}
                      href="/cat/[category]"
                      as={"/cat/" + slugParent}
                      activeClassName={css.list__item_active}
                      prefetch={false}
                    >
                      <a className={css.list__item}>
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
                              prefetch={false}
                            >
                              <a className={css.list__item}>
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
          <div className={css.column}>
            <FooterForm />
            <ContactBlock />
          </div>
        </div>
            
      </Container>
      <Container>
        <div className={css.row}>
          <p>Точка роста | 2020</p>
        </div>
      </Container>
    </div>
  );
}
export default Footer;