export type numNul = number | null

export interface InitialState {
  search: string
  authorId: numNul
  locationId: numNul
  createdFrom: string
  createdBefore: string
}
