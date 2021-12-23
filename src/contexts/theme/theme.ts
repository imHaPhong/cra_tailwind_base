import { useState } from "react"

export const useTheme = () => {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    console.log('al')
    setTheme(p => p === 'dark' ? '' : 'dark')
  }
  
  return {theme, toggleTheme}
}