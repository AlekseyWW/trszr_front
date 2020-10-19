import parse from "html-react-parser";
import css from './ProductFull.module.css';
import Button from '../Button';
import { useRouter } from "next/router";
import cx from "classnames";
import { useState } from 'react';
import Link from "../Link";
import Icon from "../Icon";
import { ModalConsumer } from "../Modal";
import Input from "../Forms/Input";
import ModalForm from "../Forms/ModalForm";


const ProductFull = ({ name, image, description, isServer, ...props }) => {
  const [ opened, setOpened ] = useState(false);
  const router = useRouter();
  const currentImage = image || props.manufacturer.image;
  return (
    <div className={css.product}>
      <div className={css.title}>
        <button
          className={css.back}
          onClick={
            !isServer
              ? router.back
              : () =>
                  router.push(
                    `/cat/[category]`,
                    `/cat/${router.query.category}`,
                    {
                      shallow: true,
                    }
                  )
          }
        >
          <div className={css.backIcon}>
            <Icon name="back" />
          </div>
          <span>Назад к списку</span>
        </button>
        <h1>{name.split(",")[0]}</h1>
        <p>{props.substance || name.split(",")[1]}</p>
      </div>

      <div className={css.info}>
        {description && <div className={cx(css.content)}>
          <h2>{name.split(",")[0]}</h2>
          <p>{parse(description)}</p>
        </div>}
        
      
        {/* <div className={css.buttons}>
          <div className={css.button}>
            <ModalConsumer>
              {({ showModal }) => (
                <Button onClick={() => showModal(() => ModalForm)}>Оставить заявку</Button>
              )}
            </ModalConsumer>
          </div>
        </div> */}
      </div>
      {props.content && (
        <div className={css.content}>{parse(props.content)}</div>
      )}
      <div className={css.taxonormes}>
        <div className={css.group}>
          {props.consist && <div className={css.block}>
            <h3>Состав: </h3>
            <p>{parse(props.consist)}</p>
          </div>}
          <div className={css.block}>
            <h3>Категория: </h3>
            <p>{props.category.name}</p>
          </div>
          {props.manufacturer && <div className={css.block}>
            <h3>Производитель: </h3>
            <p>{props.manufacturer}</p>
          </div>}
          {props.packing && <div className={css.block}>
            <h3>Фасовка: </h3>
            <p>{props.packing}</p>
          </div>}
          {props.rate && <div className={css.block}>
            <h3>Расход: </h3>
            <p>{props.rate}</p>
          </div>}
        </div>
        {currentImage && <div className={css.view}>
          <img src={`${process.env.api}/storage/${currentImage}`} />
        </div>}
      </div>
    </div>
  );
};

export default ProductFull;