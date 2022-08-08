import R from 'react'
import Search from 'components/Search'
import { getAuthors, getLocations } from 'redux/slice/dataSLice'
import Dropdown from 'components/Dropdown'
import S from './Filters.module.sass'
import { useSelector } from 'react-redux'
import {
  setLocationId,
  setCreatedFrom,
  setCreatedBefore,
  setSearch,
  setAuthorId,
} from 'redux/slice/filterSLice'
import DropdowntInputs from 'components/DropowmInputs'
import { useAppDispatch, RootState } from 'redux/store'

const Filters = () => {
  const dispatch = useAppDispatch()
  const { authors, locations } = useSelector((state: RootState) => state.data)
  const { locationId, authorId, search, createdFrom, createdBefore } =
    useSelector((state: RootState) => state.filter)
  R.useEffect(() => {
    dispatch(getAuthors())
    dispatch(getLocations())
  }, [])

  const locationsSort = R.useMemo(
    () =>
      locations.map((e) => {
        return { id: e.id, name: e.location }
      }),
    [locations]
  )

  const changeSearchValue = R.useCallback((value: string) => {
    dispatch(setSearch(value))
  }, [])

  const changeAuthorId = R.useCallback((value: number | null) => {
    dispatch(setAuthorId(value))
  }, [])

  const changeLocationId = R.useCallback((value: number | null) => {
    dispatch(setLocationId(value))
  }, [])

  const changeFrom = R.useCallback((value: string) => {
    dispatch(setCreatedFrom(value))
  }, [])

  const changeBefore = R.useCallback((value: string) => {
    dispatch(setCreatedBefore(value))
  }, [])

  return (
    <div className={S.root}>
      <Search setSearch={changeSearchValue} value={search} />
      <Dropdown
        title="Author"
        list={authors}
        changeData={changeAuthorId}
        nameId={authorId}
      />
      <Dropdown
        title="Location"
        list={locationsSort}
        changeData={changeLocationId}
        nameId={locationId}
      />
      <DropdowntInputs
        title="Created"
        setFrom={changeFrom}
        setBefore={changeBefore}
        valueFrom={createdFrom}
        valueBefore={createdBefore}
      />
    </div>
  )
}

export default Filters
