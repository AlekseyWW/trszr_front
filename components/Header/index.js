import Logo from "../../assets/logo.svg";
import { useRouter } from "next/router";

import Fertilizer from "../../assets/udobreniya.svg";
import Protect from "../../assets/zashitaRastenij.svg";
import Seed from "../../assets/semena.svg";

import css from './Header.module.css';
import Hamburger from "../Hamburger";
import Icon from "../Icon";
import Link from "../Link";

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace("-", "");
}
const Header = ({ isHomePage, categories, toggleMenu }) => (
  <div className={css.root}>
    <Hamburger toggleMenu={toggleMenu} />
    {isHomePage ? (
      <>
        <div className={css.icon}>
          <Icon name="icon" />
        </div>
        <div className={css.logo}>
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      </>
    ) : (
      <>
        <div className={css.categories}>
          {categories.map(({ image, name, slug }, id) => (
            <Link
              key={slug}
              href="/[category]"
              as={'/'+ slug}
              activeClassName={css.categories__item_active}
            >
              <div className={css.categories__item}>
                <span> {name} </span>
                {slug && <Icon name={camelize(slug)} className={css.icon} />}
              </div>
            </Link>
          ))}
        </div>
        <div className={css.icon}>
          <Icon name="icon" />
        </div>
      </>
    )}
  </div>
);

export default Header;