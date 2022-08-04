import R from 'react'
import { setPage } from 'redux/slice/dataSLice'
import { useAppDispatch } from 'redux/store'

interface ISearch {
  setSearch: (value: string) => void
}

const Search: R.FC<ISearch> = ({ setSearch }) => {
  const dispatch = useAppDispatch()
  const [timeOut, setTimeOut] = R.useState(0)

  const onChangeValue = (value: string) => {
    setTimeOut(
      window.setTimeout(() => {
        setSearch(value)
        dispatch(setPage(1))
      }, 800)
    )
    clearTimeout(timeOut)
  }
  return (
    <div>
      <input
        className="filter__wrapper"
        placeholder="Name"
        type="text"
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  )
}

export default Search
