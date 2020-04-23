import Head from 'next/head'
import Logo from '../assets/logo.svg'
import Icon from '../assets/icon.svg'
import { MainCategoriesGroup } from "../components/MainCategory";
import Layout from '../components/Layout'

const Home = ({ categories, cultures }) => {
  return (
    <Layout cultures={cultures} categories={categories} title="Точка роста">
      <MainCategoriesGroup items={categories} />
    </Layout>
  );
};

export default Home
