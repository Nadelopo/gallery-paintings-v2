type numNul = number | null

export interface Ipainting {
  id: number
  authorId: number
  locationId: number
  imageUrl: string
  name: string
  created: string
}

export interface IpaintingSort {
  id: number
  authorId: number
  locationId: number
  author: string
  imageUrl: string
  location: string
  name: string
  created: string
}

export interface Iauthors {
  id: number
  name: string
}

export interface Ilocations {
  id: number
  location: string
}

export interface IgetPaintings {
  limit: number
  page: number
  locations: Ilocations[]
  authors: Iauthors[]
  search: string
  authorId: numNul
  locationId: numNul
  createdFrom: number | string
  createdBefore: number | string
}

export interface IinitialState {
  items: IpaintingSort[]
  authors: Iauthors[]
  locations: Ilocations[]
  page: number
  limit: number
  isLoad: EisLoad
  totalPages: number
}

export enum EisLoad {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}
