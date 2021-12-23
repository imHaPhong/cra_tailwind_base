import React from 'react'
import { FieldError } from 'react-hook-form'
import { RegisterFieldType } from 'src/pages/Auth/register/register.type'

type ErrorType = {
  email?: FieldError;
  password?: FieldError;
}

type ErrorMessagePros = {
  error: ErrorType
  name: RegisterFieldType;
}

const ErrorMessage = ({ error, name }: ErrorMessagePros) => {
  return (
    <div>
      {error[name] && error[name]?.message}
    </div>
  )
}

export default ErrorMessage
