import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Filter from "../../components/Filter";
import ProductCard from '../../components/ProductCard';
import css from './Page.module.css';
import Container from '../../components/Container';
import Axios from 'axios';
import queryString from "query-string";
import { useContext } from 'react/cjs/react.production.min';
import { useRouter } from "next/router";
import parse from "html-react-parser";
import cx from "classnames";
import Icon from '../../components/Icon';
import { Transition } from 'react-transition-group';

const duration = 300;

const transitionStyles = {
  entering: css.entering,
  entered: css.entered,
  exiting: css.exiting,
  exited: css.exited,
};


const Page = ({ page }) => {
  console.log({page});
  
  const { title, body } = page;
  return (
    <Layout title="Точка роста">
      <Container className={css.inner}>
        <h1>{title}</h1>
        {parse(body)}
      </Container>
    </Layout>
  );
};

Page.getInitialProps = async({query}) => {
  const { data: page } = await Axios.get( `${process.env.api}/api/pages/${query.slug}` );
  return {
    page: page.data
  };
};

export default Page;
