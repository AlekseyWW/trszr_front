import Link from "next/link";
import styles from './MainCategory.module.css';
import Icon from "../Icon";

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '').replace('-', '');
}
const MainCategory = ({ image, name, slug, icon }) => (
  <Link href="/[category]" as={slug}>
    <a className={styles.item}>
      <span className={styles.inner}>
        <span
          className={styles.image}
          style={{ backgroundImage: `url("http://trszr.ru.test/${image}")` }}
        >
          {slug && <Icon name={camelize(slug)} className={styles.icon} />}
        </span>
        <span className={styles.title}>{name}</span>
      </span>
    </a>
  </Link>
);
export const MainCategoriesGroup = ({ items }) => (
  <div className={styles.wrapper}>
    {items.map((item, id) => (
      <MainCategory key={`item-${id}`} {...item} />
    ))}
  </div>
);

export default MainCategory;