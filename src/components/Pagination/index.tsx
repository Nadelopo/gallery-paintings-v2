import R from 'react'
import { useSelector } from 'react-redux'
import S from './Pagination.module.sass'
import { ReactComponent as PrevSVG } from 'icons/left.svg'
import { ReactComponent as NextSVG } from 'icons/right.svg'
import { ReactComponent as FirstSVG } from 'icons/first.svg'
import { ReactComponent as LastSVG } from 'icons/last.svg'
import { setPage, setLimit } from 'redux/slice/dataSLice'
import { RootState } from 'redux/store'
import { useAppDispatch } from 'redux/store'

const Pagination = () => {
  const maxPage = 3
  const [listPaginate, setListPaginate] = R.useState<number[]>([])
  const dispatch = useAppDispatch()
  const { totalPages, page } = useSelector((state: RootState) => state.data)
  const handlePageClick = (value: number) => {
    dispatch(setPage(value))
  }
  // расчет пагинации
  R.useEffect(() => {
    let g = []
    if (page === 1 && totalPages === 1) {
      g.push(page)
    }
    if (page === 1 && totalPages === 2) {
      g.push(page)
      g.push(page + 1)
    }
    if (page === 1 && maxPage <= totalPages) {
      g.push(page)
      g.push(page + 1)
      g.push(page + 2)
    }
    if (page > 1 && page + 1 < totalPages) {
      g.push(page - 1)
      g.push(page)
      g.push(page + 1)
    }
    if (page > 1 && page + 1 >= totalPages) {
      if (totalPages >= maxPage) {
        g.push(totalPages - 2)
        g.push(totalPages - 1)
        g.push(totalPages)
      }
      if (totalPages === 2) {
        g.push(totalPages - 1)
        g.push(totalPages)
      }
    }
    setListPaginate(g)
  }, [page, totalPages])

  const changeLimit = () => {
    if (window.screen.width >= 1024) {
      dispatch(setLimit(9))
    }
    if (window.screen.width < 1023) {
      dispatch(setLimit(12))
    }
  }

  R.useEffect(() => {
    window.addEventListener('resize', changeLimit)
    return () => window.removeEventListener('resize', changeLimit)
  }, [])

  return (
    <div className={S.root}>
      {totalPages > 0 && (
        <ul>
          <li>
            <button
              disabled={page === 1}
              className={S.first}
              onClick={() => dispatch(setPage(1))}
            >
              <FirstSVG />
            </button>
          </li>
          <li>
            <button
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
            >
              <PrevSVG />
            </button>
          </li>

          {listPaginate.map((number) => (
            <li key={number}>
              <button
                className={page === number ? S.active : ''}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              <NextSVG />
            </button>
          </li>
          <li>
            <button
              disabled={page === totalPages}
              className={S.last}
              onClick={() => dispatch(setPage(totalPages))}
            >
              <LastSVG />
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Pagination
