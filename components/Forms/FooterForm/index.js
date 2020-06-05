import { useForm } from "react-hook-form";
import css from "./FooterForm.module.css";
import Input from "../Input";
import Button from "../../Button";
import Icon from "../../Icon";

const FooterForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={css.input}
          register={register}
          name="email"
          label="Телефон или Email"
        />
        <Button type="submit"><Icon className={css.icon} name="back"/></Button>
      </form>
  );
};

export default FooterForm;