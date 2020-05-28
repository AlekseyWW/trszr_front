import { useState } from 'react'; 
import cx from 'classnames'; 
import css from './Hamburger.module.css';

const Hamburger = ({ toggleMenu }) => {
    const [isActive, setIsActive] = useState(false);

    const className = cx(css.root__button, {
        [css.root__button_active]: isActive
    });
    function onMouseDown() {
        setIsActive(true)
    }
    function onMouseUp() {
        setIsActive(false)
    }
    
    return <div className={css.root}>
        <button onMouseDown={onMouseDown} onMouseLeave={onMouseUp} onMouseUp={onMouseUp} type="button" onClick={toggleMenu} className={className}>
            <i className={css.root__item}></i>
            <i className={css.root__item}></i>
            <i className={css.root__item}></i>
        </button>
    </div>
}

export default Hamburger;