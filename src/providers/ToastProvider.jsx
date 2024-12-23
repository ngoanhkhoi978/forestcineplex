import { createContext, useState, useContext } from 'react';
import Toast from '~/components/Toast/Toast.jsx';
import classNames from 'classnames';
const ToastContext = createContext();

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
    const [content, setContent] = useState('');
    const [type, setType] = useState('warning');
    const [isShow, setShow] = useState(false);

    const showToast = (content, type = 'warning', delay = 3000) => {
        setContent(content);
        setType(type);
        setShow(true);

        setTimeout(() => {
            setShow(false);
        }, delay);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                className={classNames(`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out`, {
                    'opacity-0': !isShow,
                    'opacity-100': isShow,
                })}
            >
                <Toast content={content} type={type} />
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
