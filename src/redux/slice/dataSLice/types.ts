type numNul = number | null

export interface Painting {
  id: number
  authorId: number
  locationId: number
  imageUrl: string
  name: string
  created: string
}

export interface VisiblePainting extends Painting {
  author: string
  location: string
}

export interface Author {
  id: number
  name: string
}

export interface Location {
  id: number
  location: string
}

export interface GetParams {
  limit: number
  page: number
  locations: Location[]
  authors: Author[]
  search: string
  authorId: numNul
  locationId: numNul
  createdFrom: number | string
  createdBefore: number | string
}

export interface IinitialState {
  items: VisiblePainting[]
  authors: Author[]
  locations: Location[]
  page: number
  limit: number
  isLoad: EisLoad
  totalPages: number
}

export enum EisLoad {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}
