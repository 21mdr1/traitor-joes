import './Input.scss';

function Input({ id, name, placeholder, type, onChange, value, max, min }: {
    id: string;
    name: string;
    placeholder?: string;
    type: React.HTMLInputTypeAttribute;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    min?: string;
    max?: string;
}) {
    return (
        <input 
            type={type}
            className="input"
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            max={max}
            min={min}
        />
    );
}

export default Input;