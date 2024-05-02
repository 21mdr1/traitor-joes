import './Input.scss';

function Input({ id, name, placeholder, type, onChange, value }: {
    id: string;
    name: string;
    placeholder?: string;
    type: React.HTMLInputTypeAttribute;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
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
        />
    );
}

export default Input;