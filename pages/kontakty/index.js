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
  console.log('CONRCTS');
  
  return (
    <Container className={css.inner}>
      <h1>{title}</h1>
      {body && parse(body)}
      <div className={css.content}>
        <ContactForm />
        <div className={css.contacts}>
          <div className={css.contacts_item}>
            <h3>Или свяжитесь с&nbsp;нами сами</h3>
            <h4>Телефон</h4>
            {settings.phones.split("\n").map((phone) => (
              <a key={phone} href={`tel:${phone}`}>
                {phone}
              </a>
            ))}
          </div>
          <div className={css.contacts_item}>
            <h4>Адрес</h4>
            <p>{settings.address}</p>
          </div>
          <div className={css.contacts_item}>
            <h4>Email</h4>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
          <div className={css.contacts_item}>
            <h4>Режим работы</h4>
            <p>{settings.hours}</p>
          </div>
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
