import { useLayoutEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState<number>(
    Number(JSON.parse(localStorage.getItem('theme') || '0'))
  )

  useLayoutEffect(() => {
    console.log(theme)
    document.documentElement.setAttribute('data-theme', String(theme))
    localStorage.setItem('theme', String(theme))
  }, [theme])

  return { theme, setTheme }
}
