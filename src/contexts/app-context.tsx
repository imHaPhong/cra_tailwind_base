import { createContext, ReactNode, useContext } from "react";
import { useTheme } from "./theme/theme"


export const AppContext = createContext<{
  theme: ReturnType<typeof useTheme>['theme'];
  toggleTheme: () => void
}>({
  theme: 'dark',
  toggleTheme: () => { }
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)