import { useContext } from 'react';
import css from './ContactBlock.module.css';
import PagesContext from '../../store';

const ContactBlock = () => {
    const { settings } = useContext(PagesContext);

    return (
      <div className={css.contacts}>
        <div className={css.contacts_item}>
          <h5>Телефон</h5>
          {settings.phones.split("\n").map((phone) => (
            <a key={phone} href={`tel:${phone}`}>
              {phone}
            </a>
          ))}
        </div>
        
        <div className={css.contacts_item}>
          <h5>Email</h5>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
        <div className={css.contacts_item}>
          <h5>Режим работы</h5>
          <p>{settings.hours}</p>
        </div>
        <div className={css.contacts_item}>
          <h5>Адрес</h5>
          <p>{settings.address}</p>
        </div>
        
      </div>
    );
}

export default ContactBlock;