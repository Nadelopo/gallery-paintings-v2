import R from 'react'
import PaintingBlock from 'components/PaintingBlock'
import Skeleton from 'components/PaintingBlock/Skeleton'
import S from './PaintingsList.module.sass'
import { getPaintings } from 'redux/slice/dataSLice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { useAppDispatch, RootState } from 'redux/store'
import { EisLoad } from 'redux/slice/dataSLice/types'

const PaintingsList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, isLoad, page, limit, locations, authors } = useSelector(
    (state: RootState) => state.data
  )
  const { search, authorId, locationId, createdFrom, createdBefore } =
    useSelector((state: RootState) => state.filter)

  R.useEffect(() => {
    dispatch(
      getPaintings({
        limit,
        page,
        locations,
        authors,
        search,
        authorId,
        locationId,
        createdFrom,
        createdBefore,
      })
    )
    navigate(
      '?' +
        qs.stringify({
          page,
          locationId,
          authorId,
          q: search,
          createdFrom,
          createdBefore,
        })
    )
  }, [
    locations,
    authors,
    search,
    limit,
    authorId,
    locationId,
    createdFrom,
    createdBefore,
    page,
  ])

  const paintingBlock = items.map((paint) => (
    <PaintingBlock key={paint.id} {...paint} />
  ))
  const skeleton = [...new Array(limit)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div className={S.grid}>
      {isLoad === EisLoad.FULFILLED ? (
        paintingBlock
      ) : isLoad === EisLoad.PENDING ? (
        skeleton
      ) : (
        <div>Произошла ошибка...</div>
      )}
    </div>
  )
}

export default PaintingsList
