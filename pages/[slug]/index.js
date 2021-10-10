import { useState, useEffect, useContext } from "react";
import Layout from '../../components/Layout';
import Filter from "../../components/Filter";
import ProductCard from '../../components/ProductCard';
import css from './Page.module.css';
import Container from '../../components/Container';
import Axios from 'axios';
import queryString from "query-string";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import cx from "classnames";
import Icon from '../../components/Icon';
import { Transition } from 'react-transition-group';
import { Map, Placemark } from "react-yandex-maps";
import ContactForm from '../../components/Forms/ContactForm';
import PagesContext from '../../store';
import Button from "../../components/Button";
import Link from "../../components/Link";

const duration = 300;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Page = ({ page, slug }) => {
  const { title, body, children } = page;
  return (
    <Container className={css.inner}>
      <Link
        href={'/'}
        as={'/'}>
          <a className={css.back}>
            <Icon name="back" />
            <span>На главную</span>
          </a>
      </Link>
      <h1>{title}</h1>
      {body && parse(body)}
      {children && (
        <div className={css.list}>
          {children.map((item) => (
            <article key={item.slug} className={css.item}>
              {item.image && <img src={`${process.env.api}/storage/${item.image}`} />}
              <div className={css.item_content}>
                <h3 className={css.item_title}>{item.title}</h3>
                <p className={css.item_description}>{item.description}</p>
                <Link key={item.slug} href="/[slug]" as={"/" + item.slug}>
                  <a className={css.item_button}>Подробнее</a>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </Container>
  );
};

Page.getInitialProps = async({query}) => {
  const { data: page } = await Axios.get( `${process.env.api}/api/pages/${query.slug}` );
  return {
    page: page.data,
    slug: query.slug
  };
};

export default Page;
