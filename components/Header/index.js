import Logo from "../../assets/logo.svg";
import { useRouter } from "next/router";

import Fertilizer from "../../assets/udobreniya.svg";
import Protect from "../../assets/zashitaRastenij.svg";
import Seed from "../../assets/semena.svg";

import css from './Header.module.css';
import Hamburger from "../Hamburger";
import Icon from "../Icon";
import Link from "../Link";
import Container from "../Container";
import CategoryItem from "./CategoryItem";
import SearchForm from "../Forms/SearchForm";


export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace("-", "");
}
const Header = ({ isHomePage, categories, toggleMenu }) => (
  <header className={css.root}>
    <Hamburger toggleMenu={toggleMenu} />
    <Container className={!isHomePage ? css.categories : ""}>
      {isHomePage ? (
        <div className={css.inner}>
          <div className={css.icon}>
            <Icon name="icon" />
            <Logo />
          </div>
        </div>
      ) : (
        categories.map(({ image, name, slug }, id) => (
          <CategoryItem key={slug} name={name} slug={slug} />
        ))
      )}
    </Container>
    <SearchForm />
    {/* <Link href="/">
      {!isHomePage ? (
        <div className={css.icon}>
          <Icon name="icon" />
        </div>
      ) : (
        <div className={css.logo}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      )}
    </Link> */}
  </header>
);

export default Header;