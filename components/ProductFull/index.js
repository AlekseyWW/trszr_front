import parse from "html-react-parser";
import css from './ProductFull.module.css';
import Button from '../Button';
import { useRouter } from "next/router";
import { useState } from 'react';
import Link from "../Link";
import Icon from "../Icon";

const ProductFull = ({ name, image, description, isServer, ...props }) => {
  const [ opened, setOpened ] = useState(false);
  console.log({ browser: process.browser, isServer });
  const router = useRouter();
  return (
    <div className={css.product}>
      <div className={css.view}>
        <img src={`http://trszr.ru.test/${image}`} />
      </div>
      <div className={css.info}>
        <button
          className={css.back}
          onClick={
            !isServer
              ? router.back
              : () =>
                  router.push(`/cat/[category]`, `/cat/${router.query.category}`, {
                    shallow: true,
                  })
          }
        >
          <div className={css.backIcon}>
            <Icon name="back" />
          </div>
          <span>Назад к списку</span>
        </button>
        <h1>{name}</h1>
        <img
          className={css.image_mob}
          src={`${process.env.api}/storage/${image}`}
        />
        <div className={css.block}>
          <p>{parse(description)}</p>
        </div>
        <div className={css.block}>
          <h3>Состав: </h3>
          <p>{parse(props.consist)}</p>
        </div>
        <div className={css.group}>
          <div className={css.block}>
            <h3>Категория: </h3>
            <p>{props.category.name}</p>
          </div>
          <div className={css.block}>
            <h3>Производитель: </h3>
            <p>{props.manufacturer}</p>
          </div>
          <div className={css.block}>
            <h3>Фасовка: </h3>
            <p>{props.packing}</p>
          </div>
          <div className={css.block}>
            <h3>Расход: </h3>
            <p>{props.rate}</p>
          </div>
        </div>
        {props.content && (
          <div className={css.button}>
            <Button onClick={() => setOpened(true)}>Подробнее</Button>
          </div>
        )}
      </div>
      {opened && props.content && (
        <div className={css.content}>{parse(props.content)}</div>
      )}
    </div>
  );
};

export default ProductFull;