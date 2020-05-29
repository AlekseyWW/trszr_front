import { useForm } from "react-hook-form";
import css from './ContactForm.module.css';
import Input from "../Input";
import Button from "../../Button";

const ContactForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className={css.form}>
      <h4>Оставьте данные для связи</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={css.input}
          register={register}
          name="name"
          label="Имя"
        />
        <Input
          className={css.input}
          register={register}
          name="email"
          label="Email"
        />
        <Input
          className={css.input}
          register={register}
          name="company"
          label="Компания"
        />
        <Input
          className={css.input}
          register={register}
          name="phone"
          label="Телефон"
        />
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
};

export default ContactForm;