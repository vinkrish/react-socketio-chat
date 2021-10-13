import React from "react";
import { Form, Spinner } from "react-bootstrap";
import Select from 'react-select';

const reduxFormInput = (props) => {
  const {
    input, 
    type,
    placeholder,
    label,
    icon,
    meta: { 
      touched, 
      error 
    }
  } = props;

  return (
    <div className={icon && "icon-input"}>
      {icon &&
        icon
      }
      <Form.Control
        className={touched && error && "input-error"}
        {...input}
        type={type}
        placeholder={placeholder}
      />
      {touched && error && <span className="error">{error}</span>}
      <label><h6 className="bold text-uppercase">{label}</h6></label>
    </div>
  )
}

const reduxFormTextarea = (props) => {
  const {
    input,
    placeholder,
    label,
    rows,
    meta: { 
      touched, 
      error 
    }
  } = props;

  return (
    <>
      <Form.Control
        className={touched && error && "input-error"}
        {...input}
        placeholder={placeholder}
        as="textarea"
        rows={rows}
      />
      {touched && error && <span className="error">{error}</span>}
      <label><h6 className="bold text-uppercase">{label}</h6></label>
    </>
  )
}

const reduxFormSelect = (props) => {
  const {
    input,
    label,
    options,
    onClick,
    placeholder,
    meta: { 
      touched, 
      error 
    }
  } = props;

  return(
    <>
      <Select
        className={touched && error && "select-input-error"}
        {...input}
        value={input.value}
        onChange={(value) => input.onChange(value)}
        onBlur={() => input.onBlur()}
        onClick={onClick}
        noOptionsMessage={() => {
          return <Spinner animation="border" size="sm" />
        }}
        options={options}
        placeholder={placeholder}
      />
      {touched && error && <span className="error">{error}</span>}
      {label && <label><h6 className="bold text-uppercase">{label}</h6></label> }
    </>
  )
}

export {
  reduxFormInput,
  reduxFormTextarea,
  reduxFormSelect
}