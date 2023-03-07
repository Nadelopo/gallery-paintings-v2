type Path = 'paintings' | 'authors' | 'locations'

interface GetParams {
  _limit?: number
  _page?: number
  q?: string
  authorId?: number | null
  locationId?: number | null
  created_gte?: string | null
  created_lte?: string | null
}

export const get = async <T>(path: Path, params?: GetParams) => {
  let result: T[] = []
  let allItems = 0
  try {
    const searchParams: string[][] = []
    for (const key in params) {
      if (params[key as keyof GetParams]) {
        searchParams.push([key, String(params[key as keyof GetParams])])
      }
    }

    const response1 = await fetch(
      process.env.REACT_APP_API +
        '/' +
        path +
        '?' +
        new URLSearchParams(searchParams)
    )

    result = await response1.json()
    allItems = Number(response1.headers.get('x-Total-Count'))
  } catch (err) {
    console.log(err)
  }
  return { result, allItems }
}
