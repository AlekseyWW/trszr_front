import React from "react";
import { useInput } from "../../../hooks/input-hook";
import Input from "../Input";
import css from './SearchForm.module.css';
import Icon from "../../Icon";

function SearchForm(props) {
  const { value, bind, reset } = useInput("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${value}`);
    reset();
  };
  console.log({ value });
  
  return (
    <form onSubmit={handleSubmit} className={css.search}>
      <Input value={value} bind={bind} name="search" label="Поиск" />
      <button type="submit" value="Submit" className={css.submit} ><Icon name="search" /></button>
    </form>
  );
}

export default SearchForm;