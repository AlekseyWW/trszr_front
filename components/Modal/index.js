import React, {useState} from "react";
import css from './Modal.module.css'
const ModalContext = React.createContext();
export const ModalConsumer = ModalContext.Consumer;

export const Provider = ({ children }) => {
    const [props, setProps] = useState({});
    const [content, setContent] = useState(null);

    const showModal = (content, props = {}) => {
        setContent(content);
        setProps(props);
    };

    const hideModal = () => {
        setContent(null);
        setProps({});
    };

    return (
      <ModalContext.Provider value={{ props, content, showModal, hideModal }}>
        {children}
        {content ? <Modal content={content} /> : ""}
      </ModalContext.Provider>
    );
};

const Modal = (props) => {
    const Content = props.content;
    return (
      <ModalConsumer>
        {({ hideModal }) => (
          <div className={css.modal}>
            <div className={css.overlay} onClick={hideModal}></div>
            <div className={css.content}>
                <button className={css.close} onClick={hideModal}>Закрыть</button>
                <Content />
            </div>
          </div>
        )}
      </ModalConsumer>
    );
};
