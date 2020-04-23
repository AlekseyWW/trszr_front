import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ children }) => {
    const [container, setContainer] = useState(null);

    useEffect(() => {
        const rootContainer = document.createElement('div');
        const parentElem = document.querySelector('#__next');
        parentElem.appendChild(rootContainer);
        setContainer(rootContainer);
    }, []);
    
    const element = (
        <div>
            {children}
        </div>
    );
        
    return container ? ReactDOM.createPortal(element, container): null;
};


export default React.memo(ModalWrapper);