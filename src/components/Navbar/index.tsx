import { ReactComponent as LogoSVG } from 'icons/logo.svg'
import { ReactComponent as ThemeSVG } from 'icons/theme.svg'
import S from './navbar.module.sass'
import { useTheme } from 'utils/theme'

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className={S.navbar}>
      <LogoSVG className={S.logo} />
      <ThemeSVG className={S.theme} onClick={() => setTheme(Number(!theme))} />
    </div>
  )
}

export default Navbar
