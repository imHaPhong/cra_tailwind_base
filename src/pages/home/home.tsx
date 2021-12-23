import { useTheme } from 'src/contexts/theme/theme'

export const Home = () => {

  const { toggleTheme, theme } = useTheme()

  return (
    <div >
      <h1 className='dark:text-red-300 '>
        Hello
      </h1>
      <button onClick={toggleTheme}>
        ALo
      </button>
    </div>
  )
}
