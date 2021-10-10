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
import Link from "../../components/Link";

const duration = 300;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Page = ({ page, slug, partners, sertificates }) => {
  const { settings } = useContext(PagesContext);
  const { title, description, body } = page;
  
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
      {description && parse(description)}
      {body && parse(body)}
      <h2>Наши партнеры: </h2>
      {partners && <div className={css.partners}>
        {partners.map(partner => <div className={css.partner} key={partner.id}>
          <img src={`${process.env.api}/storage/${partner.image}`} />
        </div>)}
      </div>}
      {sertificates && <div className={css.sertificates}>
        <h2>Сертификаты: </h2>
        {sertificates.map(sertificate => <div className={css.sertificate} key={sertificate.id}>
          <img src={`${process.env.api}/storage/${sertificate.image}`} />
        </div>)}
      </div>}
    </Container>
  );
};

Page.getInitialProps = async({query}) => {
  const { data: page } = await Axios.get(
    `${process.env.api}/api/pages/about`
  );
  const { data: partners } = await Axios.get(
    `${process.env.api}/api/partners`
  );
  const { data: sertificates } = await Axios.get(
    `${process.env.api}/api/sertificates`
  );
  
  return {
    page: page.data,
    partners,
    sertificates: sertificates.data,
    slug: query.slug
  };
};

export default Page;
