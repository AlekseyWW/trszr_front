import React, { useState, useRef, useEffect, useMemo } from "react";
import cx from "classnames";
import { useInput } from "../../../hooks/input-hook";
import Input from "../Input";
import css from './SearchForm.module.css';
import Icon from "../../Icon";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useRouter } from "next/router";

function SearchForm({ className }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef('');
  const { register, handleSubmit, watch, setValue, errors } = useForm();

  const onSubmit = ({search}) => {
    router.push(`/search?search=${search}`)
    setIsOpen(false);
    setValue("search", "")
    formRef.current[0].blur();
  }

  const openForm = () => {
    setIsOpen(!isOpen);
    if (!isOpen && formRef.current) {
      console.log({ formRef: formRef.current[0] });
      formRef.current[0].focus();
    }
  }

  // useEffect(() => {
  //   if (formRef.current) {
  //     console.log({ formRef: formRef.current[0]});
  //     setTimeout(() => {
  //       formRef.current[0].focus();
  //     });
  //   }
  // }, [isOpen, formRef]);
  
  return (<div className={cx(css.search, className)}>
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={cx(css.form, isOpen ? css.open : css.close)}>
      <div className={css.inner}>

        <Input className={css.input} register={register} name="search" label="Поиск" />
        <button type="submit" value="Submit" className={css.submit}>
          <Icon name="search" />
        </button>
      </div>
    </form>
    <button onClick={openForm} type="button" value="Submit" className={css.button}>
      {isOpen ? <Icon name="close" /> : <Icon name="search" />}
    </button>
  </div>);
}

export default SearchForm;
