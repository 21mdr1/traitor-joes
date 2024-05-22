import { MouseEventHandler, ReactNode } from 'react';
import './Button.scss';

function Button({ type, children, onClick, disabled }: {
    type?: 'submit' | 'reset' | 'button';
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
} ) {
    return (
        <button 
            className="button" 
            type={ type } 
            onClick={ onClick }
            disabled={ disabled }
        >
            { children }
        </button>
    ); 
}

export default Button;