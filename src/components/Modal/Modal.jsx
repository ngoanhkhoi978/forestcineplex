import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose(false);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed bottom-0 left-0 right-0 top-0 z-50 m-0 flex items-center justify-center bg-black/50"
                    onClick={() => onClose(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div onClick={(e) => e.stopPropagation()}>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
};

export default Modal;
