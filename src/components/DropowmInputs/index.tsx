import R from 'react'
import S from './DropdownInputs.module.sass'
import { ReactComponent as TickSVG } from 'icons/tick.svg'
import 'styles/Dropdown.sass'
import { setPage } from 'redux/slice/dataSLice'
import { useAppDispatch } from 'redux/store'

interface IDropdownInputs {
  title: string
  setFrom: (value: number | null) => void
  setBefore: (value: number | null) => void
}

const DropdownInputs: React.FC<IDropdownInputs> = ({
  title,
  setFrom,
  setBefore,
}) => {
  const dispatch = useAppDispatch()
  const ul = R.useRef(null)
  const [active, setActive] = R.useState(false)
  const [timeOutFrom, setTimeOutFrom] = R.useState(0)
  const [timeOutBefore, setTimeOutBefore] = R.useState(0)

  const clickOutside = (e: MouseEvent) => {
    if (ul.current && !e.composedPath().includes(ul.current)) {
      setActive(false)
    }
  }

  const onChangeValueFrom = (value: number) => {
    setTimeOutFrom(
      window.setTimeout(() => {
        setFrom(value)
        dispatch(setPage(1))
      }, 800)
    )
    clearTimeout(timeOutFrom)
  }

  const onChangeValueBefore = (value: number) => {
    setTimeOutBefore(
      window.setTimeout(() => {
        setBefore(value)
        dispatch(setPage(1))
      }, 800)
    )
    clearTimeout(timeOutBefore)
  }

  R.useEffect(() => {
    window.addEventListener('click', (e) => clickOutside(e))
    return () => window.removeEventListener('click', (e) => clickOutside(e))
  }, [])

  return (
    <div className="main" ref={ul}>
      <div className={`root filter__wrapper ${active && S.root__active}`}>
        <div>{title}</div>
        <TickSVG
          onClick={() => setActive(!active)}
          className={`tick ${active && ' tick__active'}`}
        />
      </div>
      <div className={S.drop + ` ${active && S.drop__active}`}>
        <div>
          <input
            type="number"
            placeholder="from"
            onChange={(e) => onChangeValueFrom(Number(e.target.value))}
          />
        </div>
        <div className={S.line}></div>
        <div>
          <input
            type="number"
            placeholder="before"
            onChange={(e) => onChangeValueBefore(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default DropdownInputs
