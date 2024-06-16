import { ReactNode } from 'react';
import './Modal.scss';

function Modal({ children, className }: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className="modal">
            <div className={`modal__container ${className}`}>
                { children }
            </div>
        </div>
    );
}

export default Modal;