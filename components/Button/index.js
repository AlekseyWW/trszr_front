import cx from 'classnames';
import css from './Button.module.css';

const Button = ({children, className, type, ...props}) => {
    return <button className={cx(css.button, { [className]: className })} {...props} type={type || 'button'}>
        {children}
    </button>
};

export default Button;
