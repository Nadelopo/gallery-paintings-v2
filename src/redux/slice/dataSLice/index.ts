import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import qs from 'qs'
import { get } from 'utils/queries'
import {
  EisLoad,
  Author,
  GetParams,
  IinitialState,
  Location,
  Painting
} from './types'

export const getPaintings = createAsyncThunk<
  {
    data: Painting[]
    locations: Location[]
    authors: Author[]
    headerPages: number
  },
  GetParams
>('paintings/getPaintings', async (params) => {
  const {
    limit,
    page,
    locations,
    authors,
    search,
    authorId,
    locationId,
    createdFrom,
    createdBefore
  } = params
  const response = await get<Painting>('paintings', {
    _page: page,
    _limit: limit,
    authorId,
    locationId,
    created_gte: String(createdFrom),
    created_lte: String(createdBefore),
    q: search
  })
  const headerPages = response.allItems
  const data = response.result
  return { data, locations, authors, headerPages }
})

export const getAuthors = createAsyncThunk('authors/getAuthors', async () => {
  const { result } = await get<Author>('authors')
  return result
})

export const getLocations = createAsyncThunk(
  'locations/getLocations',
  async () => {
    const { result } = await get<Location>('locations')
    return result
  }
)

const getPageFromUrl = () =>
  window.location.search
    ? Number(qs.parse(window.location.search.substring(1)).page)
    : 1

const initialState: IinitialState = {
  items: [],
  authors: [],
  locations: [],
  page: getPageFromUrl(),
  limit: window.screen.width >= 1024 ? 9 : 12,
  isLoad: EisLoad.PENDING,
  totalPages: 0
}

export const dataSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    setPage(state: IinitialState, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setLimit(state: IinitialState, action: PayloadAction<number>) {
      state.limit = action.payload
      state.page = 1
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPaintings.pending, (state) => {
      state.isLoad = EisLoad.PENDING
    })
    builder.addCase(getPaintings.fulfilled, (state, action) => {
      if (state.isLoad !== EisLoad.REJECTED) {
        state.items = action.payload.data.map((e, i) => {
          if (i === action.payload.data.length - 1) {
            state.isLoad = EisLoad.FULFILLED
          }
          return {
            ...e,
            author: action.payload.authors.filter((a) => a.id === e.authorId)[0]
              ?.name,
            location: action.payload.locations.filter(
              (a) => a.id === e.locationId
            )[0]?.location
          }
        })
        if (action.payload.data.length === 0) {
          state.isLoad = EisLoad.FULFILLED
        }
        state.totalPages = Math.ceil(action.payload.headerPages / state.limit)
      }
    })
    builder.addCase(getPaintings.rejected, (state) => {
      state.isLoad = EisLoad.REJECTED
    })
    builder.addCase(getAuthors.fulfilled, (state, action) => {
      state.authors = action.payload
    })
    builder.addCase(getAuthors.rejected, (state) => {
      state.isLoad = EisLoad.REJECTED
    })

    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations = action.payload
    })

    builder.addCase(getLocations.rejected, (state) => {
      state.isLoad = EisLoad.REJECTED
    })
  }
})

export const { setPage, setLimit } = dataSlice.actions

export default dataSlice.reducer
