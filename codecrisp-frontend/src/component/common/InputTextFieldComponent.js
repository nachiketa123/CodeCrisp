import { useState } from "react";

const InputTextFieldComponent = ({
    type,
    className,
    name,
    error,
    id,
    disabled,
    height,
    width,
    placeholder,
    required,
    autoComplete
}) => {
    return ( 
        <input 
            type={type}
            className={className}
            name = {name}
            error = {error}
            id = {id}
            disabled = {disabled}
            height = {height}
            width = {width}
            placeholder = {placeholder}
            required = {required}
            autoComplete = {autoComplete}
        />
     );
}
 
export default InputTextFieldComponent;