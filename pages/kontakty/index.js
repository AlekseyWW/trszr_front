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
import ContactBlock from "../../components/ContactsBlock";

const duration = 300;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Page = ({ page, slug }) => {
  const { settings } = useContext(PagesContext);
  const { title, body } = page;
  
  return (
    <Container className={css.inner}>
      <h1>{title}</h1>
      {body && parse(body)}
      <div className={css.content}>
        <div className={css.item}>
          <h3>Оставьте данные для связи</h3>
          <ContactForm />
        </div>
        <div className={css.item}>
          <h3>Или свяжитесь с&nbsp;нами сами</h3>
          <ContactBlock />
        </div>
      </div>
      <h2>Мы на карте:</h2>
      <Map
        width="100%"
        defaultState={{ center: [47.251702, 39.764573], zoom: 14 }}
      >
        <Placemark
          geometry={[47.251702, 39.764573]}
          properties={{ iconCaption: "Точка роста" }}
        />
      </Map>
    </Container>
  );
};

Page.getInitialProps = async({query}) => {
  const { data: page } = await Axios.get(
    `${process.env.api}/api/pages/kontakty`
  );
  return {
    page: page.data,
    slug: query.slug
  };
};

export default Page;
