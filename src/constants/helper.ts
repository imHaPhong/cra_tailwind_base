import { AxiosResponse } from "axios"
import { AuthApiProps } from "src/api/auth-api"

export const rules = {
  email: {
    required: {
      value: true,
      message: 'Email la bat buoc'
    },
    minLength: {
      value: 5,
      message: "Min 5 ky ty"
    },
    validate: {
      email: (v: string) => v.includes('@') || "email la bat buoc"
    }
  },
  password: {
    required: {
      value: true,
      message: 'Email la bat buoc'
    },
  }
}

export const payloadCreator = (asyncFunc: (data: AuthApiProps) => Promise<AxiosResponse>)  =>  async (arg : AuthApiProps, thunkApi : any) => {
  try {
    const res=  await asyncFunc(arg)
    return res
  } catch (error) {
    console.log(error)
    return thunkApi.rejectWithValue(error)

  }
}