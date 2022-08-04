import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import data from 'redux/slice/dataSLice'
import filter from 'redux/slice/filterSLice'

export const store = configureStore({
  reducer: {
    data,
    filter,
  },
})

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>
