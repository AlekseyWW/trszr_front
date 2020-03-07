import Link from "next/link";
import styles from './MainCategory.module.css';

const MainCategory = ({ image, title, slug, Icon }) => (
  <Link href={`/${slug}`} >
    <a className={styles.item}>
      <span className={styles.inner}>
        <span
          className={styles.image}
          style={{ backgroundImage: `url("${image}")` }}
        >
          {Icon && <Icon className={styles.icon} />}
        </span>
        <span className={styles.title}>{title}</span>
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