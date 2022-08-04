import R from 'react'
import S from './Dropdown.module.sass'
import { ReactComponent as TickSVG } from 'icons/tick.svg'
import { ReactComponent as CleanSVG } from 'icons/clean.svg'
import 'styles/Dropdown.sass'
import { setPage } from 'redux/slice/dataSLice'
import { useAppDispatch } from 'redux/store'

interface IDropdown {
  list: {
    id: number
    name: string
  }[]
  title: string
  changeData: (data: number | null) => void
  nameId: number | null
}

const Dropdown: React.FC<IDropdown> = ({ list, title, changeData, nameId }) => {
  const [active, setActive] = R.useState(false)
  const dispatch = useAppDispatch()
  const ul = R.useRef(null)
  const [name, setName] = R.useState(title)

  const choose = (id: number | null) => {
    changeData(id)
    setActive(!active)
    dispatch(setPage(1))
  }

  const clean = () => {
    changeData(null)
  }

  const clickOutside = (e: MouseEvent) => {
    if (ul.current && !e.composedPath().includes(ul.current)) {
      setActive(false)
    }
  }

  R.useEffect(() => {
    setName(list.filter((e) => e.id === nameId)[0]?.name)
  }, [list, nameId])

  R.useEffect(() => {
    window.addEventListener('click', (e) => clickOutside(e))
    return () => window.removeEventListener('click', (e) => clickOutside(e))
  }, [])

  return (
    <div className="main" ref={ul}>
      <div className={`root filter__wrapper ${active && 'root__active'}`}>
        <div className={S.head__wrapper}>
          <div className={S.title}> {nameId ? name : title} </div>{' '}
          {name ? <CleanSVG onClick={clean} className="clean" /> : <div></div>}
          <TickSVG
            onClick={() => setActive(!active)}
            className={`tick ${active && 'tick__active'}`}
          />
        </div>
      </div>
      <div className={`list  ${active && 'list__active'}`}>
        <div className={S.li} onClick={() => choose(null)}>
          all
        </div>
        {list.map((e) => (
          <div className={S.li} key={e.id} onClick={() => choose(e.id)}>
            {e.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
