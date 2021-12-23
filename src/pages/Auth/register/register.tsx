import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from 'src/components/error-message'
import { rules } from 'src/constants/helper'
import { path } from 'src/constants/path'
import { ResponseErrorType } from 'src/constants/respone-error.type'
import { useAppDispatch } from 'src/hook/hook'
import http from 'src/utils/http'
import { register } from '../auth.slice'
import { RegisterFieldType, RegisterFormType } from './register.type'

const Register = () => {

  const { control, handleSubmit, getValues, setError, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleRegister = async (data: RegisterFormType) => {
    const body = {
      email: data.email,
      password: data.password,
    }
    try {
      const res = await dispatch(register(body))
      unwrapResult(res)
      navigate(path.home)
    } catch (error: any) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key as RegisterFieldType, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Controller name="email" control={control} rules={rules.email} render={({ field }) =>
          <input type="text" name="email" placeholder='Email' onChange={field.onChange} value={getValues('email')} />} />
        <ErrorMessage error={errors} name='email' />

        <Controller name='password' control={control} rules={rules.password} render={({ field }) => (<input name='password' type='password' placeholder='Password' onChange={field.onChange} value={getValues('password')} />)} />
        <ErrorMessage error={errors} name='password' />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
