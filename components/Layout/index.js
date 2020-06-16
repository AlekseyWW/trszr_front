import { useState, useContext } from "react";
import Head from "next/head";
import cx from "classnames";
import { useRouter } from "next/router";
import css from './Layout.module.css';
import Header from "../Header";
import Menu from "../Menu";
import PagesContext from "../../store";
import Footer from "../Footer";

const Layout = ({ children, title }) => {
  const router = useRouter();
  const { categories, cultures } = useContext(PagesContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = router.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  
  return (<>
    <div className={css.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        isOpen={isMenuOpen}
        isHomePage={isHomePage}
        toggleMenu={toggleMenu}
        categories={categories}
      />
      <main className={cx(css.main, isHomePage ? css.home : '', isMenuOpen ? css.main_menu : '')}>
        {children}
      </main>
      <Menu in={isMenuOpen} toggleMenu={toggleMenu} categories={categories} cultures={cultures} />
    </div>
    <Footer />
  </>);
};

export default Layout;