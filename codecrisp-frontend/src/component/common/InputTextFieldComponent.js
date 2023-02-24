import React, { useState } from "react";
import isEmpty from "../../utility/is-empty"
import "./InputTextFieldComponent.css"

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
    autoComplete,
    areaDescribedBy,
    value,
    onChange,
    infotext
}) => {
    className = !isEmpty(error)? className.toString() + " is-invalid": className.toString()
    return ( 
        <div className="input-text-field-component-container">
            <input 
                type={type}
                className={ className }
                name = {name}
                error = {error}
                id = {id}
                disabled = {disabled}
                height = {height}
                width = {width}
                placeholder = {placeholder}
                required = {required}
                autoComplete = {autoComplete}
                aria-describedby = {areaDescribedBy}
                value = {value}
                onChange = {onChange}
            />
            {!isEmpty(infotext)?<InfoIcon message={infotext}/>:''}
            {!isEmpty(error)?<div style={{backgroundColor: 'silver'}} className="invalid-feedback">{error}</div>:''}
        </div>
        
     );
}

const InfoIcon = ({ message }) => {
    return (
      <div className="input-text-field-info-icon-container">
        <span className="input-text-field-info-icon">?</span>
        <div className="input-text-field-info-icon-msg">{message}</div>
      </div>
    );
  };
 
export default InputTextFieldComponent;