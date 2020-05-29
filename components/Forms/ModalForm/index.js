import { useForm } from "react-hook-form";
import css from "./ModalForm.module.css";
import Input from "../Input";
import Button from "../../Button";

const ModalForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className={css.form}>
      <h3>Заявка</h3>
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

export default ModalForm;