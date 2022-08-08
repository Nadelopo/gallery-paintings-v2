import R from 'react'
import { setPage } from 'redux/slice/dataSLice'
import { useAppDispatch } from 'redux/store'

interface ISearch {
  setSearch: (value: string) => void
  value: string
}

const Search: R.FC<ISearch> = ({ setSearch, value }) => {
  const dispatch = useAppDispatch()
  const [timeOut, setTimeOut] = R.useState(0)
  const [searchValue, setSearchValue] = R.useState(value)

  const onChangeValue = (value: string) => {
    setSearchValue(value)
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
        value={searchValue}
        className="filter__wrapper"
        placeholder="Name"
        type="text"
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  )
}

export default Search
