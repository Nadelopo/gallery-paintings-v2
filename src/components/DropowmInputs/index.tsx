import R from 'react'
import S from './DropdownInputs.module.sass'
import { ReactComponent as TickSVG } from 'icons/tick.svg'
import 'styles/Dropdown.sass'
import { setPage } from 'redux/slice/dataSLice'
import { useAppDispatch } from 'redux/store'

interface IDropdownInputs {
  title: string
  setFrom: (value: string) => void
  setBefore: (value: string) => void
  valueFrom: string
  valueBefore: string
}

const DropdownInputs: React.FC<IDropdownInputs> = ({
  title,
  setFrom,
  setBefore,
  valueFrom,
  valueBefore,
}) => {
  const dispatch = useAppDispatch()
  const ul = R.useRef(null)
  const [active, setActive] = R.useState(false)
  const [timeOutFrom, setTimeOutFrom] = R.useState(0)
  const [timeOutBefore, setTimeOutBefore] = R.useState(0)

  const [valueFromInstantly, setValueFromInstantly] = R.useState(valueFrom)
  const [valueBeforeInstantly, setValueBeforeInstantly] =
    R.useState(valueBefore)

  const clickOutside = (e: MouseEvent) => {
    if (ul.current && !e.composedPath().includes(ul.current)) {
      setActive(false)
    }
  }

  const onChangeValueFrom = (value: string) => {
    setValueFromInstantly(value)
    setTimeOutFrom(
      window.setTimeout(() => {
        setFrom(value)
        dispatch(setPage(1))
      }, 800)
    )
    clearTimeout(timeOutFrom)
  }

  const onChangeValueBefore = (value: string) => {
    setValueBeforeInstantly(value)
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
            value={valueFromInstantly}
            type="number"
            placeholder="from"
            onChange={(e) => onChangeValueFrom(e.target.value)}
          />
        </div>
        <div className={S.line}></div>
        <div>
          <input
            value={valueBeforeInstantly}
            type="number"
            placeholder="before"
            onChange={(e) => onChangeValueBefore(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default DropdownInputs
