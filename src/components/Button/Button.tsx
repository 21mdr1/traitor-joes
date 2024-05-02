import { MouseEventHandler, ReactNode } from 'react';
import './Button.scss';

function Button({ type, children, onClick }: {
    type?: 'submit' | 'reset' | 'button';
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>; 
} ) {
    return (
        <button className="button" type={ type } onClick={ onClick }>{ children }</button>
    ); 
}

export default Button;