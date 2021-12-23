import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "src/components/error-message";
import { rules } from "src/constants/helper";
import { path } from "src/constants/path";
import { useAppDispatch } from "src/hook/hook";
import { login } from "../auth.slice";
import { RegisterFieldType, RegisterFormType } from "../register/register.type"

const Login = () => {
  const {
    control,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin = async (data: RegisterFormType) => {
    try {
      const res = await dispatch(login(data))
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
  };

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          control={control}
          name="email"
          rules={rules.email}
          render={({ field }) => (
            <input
              value={getValues("email")}
              onChange={field.onChange}
              name="email"
              placeholder="email ..."
            />
          )}
        />
        <ErrorMessage name="email" error={errors} />

        <Controller
          control={control}
          name="password"
          rules={rules.password}
          render={({ field }) => (
            <input
              value={getValues("password")}
              onChange={field.onChange}
              name="password"
              placeholder="Password"
            />
          )}
        />
        <ErrorMessage name="password" error={errors} />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
