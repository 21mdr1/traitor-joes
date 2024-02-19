import { MouseEventHandler, ReactNode } from 'react';
import './Button.scss';

type buttonType = {
    type?: 'submit' | 'reset' | 'button',
    children: ReactNode,
    onClick: MouseEventHandler<HTMLButtonElement>
}

function Button({ type, children, onClick }: buttonType ) {
    return (
        <button className="button" type={ type } onClick={ onClick }>{ children }</button>
    ); 
}

export default Button;