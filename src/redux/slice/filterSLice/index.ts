import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import qs from 'qs'
import { IinitialState, numNul } from './types'

const query = qs.parse(window.location.search.replace('?', ''))

const initialState: IinitialState = {
  search: '',
  authorId: query.authorId ? Number(query.authorId) : null,
  locationId: query.locationId ? Number(query.locationId) : null,
  createdFrom: null,
  createdBefore: null,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state: IinitialState, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setAuthorId(state: IinitialState, action: PayloadAction<numNul>) {
      state.authorId = action.payload
    },
    setLocationId(state: IinitialState, action: PayloadAction<numNul>) {
      state.locationId = action.payload
    },
    setCreatedFrom(state: IinitialState, action: PayloadAction<numNul>) {
      state.createdFrom = action.payload
    },
    setCreatedBefore(state: IinitialState, action: PayloadAction<numNul>) {
      state.createdBefore = action.payload
    },
  },
})

export const {
  setSearch,
  setAuthorId,
  setLocationId,
  setCreatedFrom,
  setCreatedBefore,
} = filterSlice.actions

export default filterSlice.reducer
