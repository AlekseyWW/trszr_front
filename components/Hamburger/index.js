import { useState } from 'react'; 
import cx from 'classnames'; 
import css from './Hamburger.module.css';

const Hamburger = ({ toggleMenu, className, isOpen }) => {
    const [isActive, setIsActive] = useState(false);

    const classNames = cx(css.root__button, {
        [css.root__button_active]: isActive,
        [css.root__button_open]: isOpen,
    });
    function onMouseDown() {
        setIsActive(true)
    }
    function onMouseUp() {
        setIsActive(false)
    }
    
    return <div className={cx(css.root, className)}>
        <button onMouseDown={onMouseDown} onMouseLeave={onMouseUp} onMouseUp={onMouseUp} type="button" onClick={toggleMenu} className={classNames}>
            <i className={css.root__item}></i>
            <i className={css.root__item}></i>
            <i className={css.root__item}></i>
        </button>
    </div>
}

export default Hamburger;