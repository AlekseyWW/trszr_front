import { useContext } from 'react';
import css from './ContactBlock.module.css';
import cx from 'classnames';
import PagesContext from '../../store';

const ContactBlock = ({className}) => {
    const { settings } = useContext(PagesContext);

    return (
      <div className={cx(css.contacts, className)}>
        <div className={css.contacts_item}>
          <h3>Телефон</h3>
          {settings.phones.split("\n").map((phone) => (
            <a key={phone} href={`tel:${phone}`}>
              {phone}
            </a>
          ))}
        </div>

        <div className={css.contacts_item}>
          <h3>Email</h3>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
        <div className={css.contacts_item}>
          <h3>Режим работы</h3>
          <p>{settings.hours}</p>
        </div>
        <div className={css.contacts_item}>
          <h3>Адрес</h3>
          <p>{settings.address}</p>
        </div>
      </div>
    );
}

export default ContactBlock;