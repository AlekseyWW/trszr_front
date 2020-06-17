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
      <div className={css.title}>
        <span className={css.logo}>Точка роста</span>
        <span className={css.logo_note}>Урожай в полную силу</span>
      </div>
      {body && parse(body)}
      <div className={css.content}>
        {/* <div className={css.item}>
          <ContactForm />
        </div> */}
        <div className={css.item}>
          <ContactBlock />
        </div>
      </div>
      <Map
        width="100%"
        className={css.map}
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
