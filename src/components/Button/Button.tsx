import { MouseEventHandler, ReactNode } from 'react';
import './Button.scss';
import { eventNames } from 'process';

function Button({ type, children, onClick, disabled, level }: {
    type?: 'submit' | 'reset' | 'button';
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    level?: 'primary' | 'secondary';
} ) {

    level = level || 'primary';

    return (
        <button 
            className={`button button--${level}`} 
            type={ type } 
            onClick={ onClick }
            disabled={ disabled }
        >
            { children }
        </button>
    ); 
}

export default Button;