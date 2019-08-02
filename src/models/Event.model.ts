export interface Repeat {
  label: string
  value: {
    repeat?: number
    repeatDays?: number[]
    repeatMonthDay?: number
    repeatDate?: number[]
  }
}

export interface EventInterface {
  name: string
  description: string
  location: string
  fromDate: string | Date
  id?: number
  type: string
  repeat: Repeat
}
