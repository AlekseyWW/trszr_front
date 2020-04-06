import css from './Hamburger.module.css';

const Hamburger = ({ toggleMenu }) => <div className={css.root}>
    <button type="button" onClick={toggleMenu} className={css.root__button}>
        <i className={css.root__item}></i>
        <i className={css.root__item}></i>
        <i className={css.root__item}></i>
    </button>
</div>

export default Hamburger;