import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import qs from 'qs'
import { InitialState, numNul } from './types'

const query = qs.parse(window.location.search.replace('?', ''))

const initialState: InitialState = {
  search: query.q ? String(query.q) : '',
  authorId: query.authorId ? Number(query.authorId) : null,
  locationId: query.locationId ? Number(query.locationId) : null,
  createdFrom: query.createdFrom ? String(query.createdFrom) : '',
  createdBefore: query.createdBefore ? String(query.createdBefore) : ''
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setAuthorId(state, action: PayloadAction<numNul>) {
      state.authorId = action.payload
    },
    setLocationId(state, action: PayloadAction<numNul>) {
      state.locationId = action.payload
    },
    setCreatedFrom(state, action: PayloadAction<string>) {
      state.createdFrom = action.payload
    },
    setCreatedBefore(state, action: PayloadAction<string>) {
      state.createdBefore = action.payload
    }
  }
})

export const {
  setSearch,
  setAuthorId,
  setLocationId,
  setCreatedFrom,
  setCreatedBefore
} = filterSlice.actions

export default filterSlice.reducer
