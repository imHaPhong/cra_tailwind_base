import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './../store';
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelecter: TypedUseSelectorHook<RootState> = useSelector

export const useAuthenticated = () => {
  return useAppSelecter(value => Boolean(value.auth.profile._id))
}