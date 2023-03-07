import S from './PaintingBlock.module.sass'

interface PaintingBlockProps {
  author: string
  created: string
  imageUrl: string
  location: string
  name: string
  id: number
}

const PaintingBlock: React.FC<PaintingBlockProps> = ({
  author,
  created,
  imageUrl,
  location,
  name
}) => {
  return (
    <div className={S.wrapper}>
      <img
        src={process.env.REACT_APP_API + imageUrl}
        alt="ошибка загрузки..."
        className={S.img}
      />
      <div className={S.content}>
        <div className={S.head}>{name}</div>
        <div className={S.text}>
          <b>Author: </b>
          {author}
        </div>
        <div className={S.text}>
          <b>Created: </b>
          {created}
        </div>
        <div className={S.text}>
          <b>Location: </b>
          {location}
        </div>
      </div>
    </div>
  )
}

export default PaintingBlock
