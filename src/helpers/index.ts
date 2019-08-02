import { weekDayNames, monthNames, msInDay } from '../constants'
import { EventInterface } from '../models'

// TODO: to different files

export const getMonthTable = (
  year: number,
  month: number,
  events?: EventInterface[],
  eventTypes?: string[]
) => {
  const dayOffset = new Date(year, month).getDay() - 2
  const table = []
  for (let i = 0; i < 35; i += 1) {
    const dayDate = new Date(year, month, i - dayOffset)
    const isGray =
      i - dayOffset < 1 ||
      new Date(year, month + 1, 0).getDate() < i - dayOffset

    if (events && events.length && eventTypes) {
      const isEvent = events.some(event => {
        return eventTypes.includes(event.type) && isEventDay(dayDate, event)
      })
      table.push({ date: dayDate, day: dayDate.getDate(), isEvent, isGray })
    } else {
      table.push({ date: dayDate, day: dayDate.getDate(), isGray })
    }
  }
  return table
}

export const getWeekTable = (
  year: number,
  month: number,
  day: number,
  events?: EventInterface[],
  eventTypes?: string[]
) => {
  const table = []

  const date = new Date(year, month, day)
  const firstDay = new Date(year, month, day)
  const days = (date.getDay() + 7 - 1) % 7
  firstDay.setDate(date.getDate() - days)

  for (let i = 0; i < 7; i += 1) {
    const dayDate = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDay()
    )
    dayDate.setDate(firstDay.getDate() + i)
    if (events && events.length && eventTypes) {
      const isEvent = events.some(event => {
        return eventTypes.includes(event.type) && isEventDay(dayDate, event)
      })
      table.push({ date: dayDate, day: dayDate.getDate(), isEvent })
    } else {
      table.push({ date: dayDate, day: dayDate.getDate() })
    }
  }
  return table
}

export const calculateWeek = (
  year: number,
  month: number,
  day: number,
  amount: number
) => {
  const oneWeekAgo = new Date(year, month, day)
  oneWeekAgo.setDate(oneWeekAgo.getDate() + 7 * amount)
  return {
    year: oneWeekAgo.getFullYear(),
    month: oneWeekAgo.getMonth(),
    day: oneWeekAgo.getDate()
  }
}

const isEventDay = (dayDate: Date, event: EventInterface) => {
  const fromDateTime = new Date(event.fromDate).getTime()
  const dayDateTime = dayDate.getTime()
  if (fromDateTime > dayDateTime) return false
  // TODO: repeat....repeat.....repeat (change naming)
  const repeatValue = event.repeat.value

  if (repeatValue.repeat) {
    return repeatValue.repeat === 1
      ? fromDateTime === dayDateTime
      : true
  }
  if (repeatValue.repeatDays) {
    return (repeatValue.repeatDays as number[]).includes(dayDate.getDay())
  }
  if (repeatValue.repeatMonthDay) {
    return repeatValue.repeatMonthDay === dayDate.getDate()
  }
  if (repeatValue.repeatDate) {
    return (
      (repeatValue.repeatDate as number[])[0] === dayDate.getMonth() &&
      (repeatValue.repeatDate as number[])[1] === dayDate.getDate()
    )
  }
  return false
}

export const eventsForDay = (
  dayDate: Date,
  eventList: EventInterface[],
  types: string[]
) => {
  return eventList.filter(
    event => types.includes(event.type) && isEventDay(dayDate, event)
  )
}

export const calculateDate = (year: number, month: number, amount: number) => {
  const date = new Date(year, month + amount)
  return { year: date.getFullYear(), month: date.getMonth() }
}

export const displayDate = (timestamp: string) => {
  const a = new Date(timestamp)
  const year = a.getFullYear()
  const month = monthNames[a.getMonth()]
  const date = a.getDate()
  const result = `${date} ${month} ${year}`
  return result
}

export const getRepeatOptions = (activeDay: Date) => [
  { label: 'One time event', value: { repeat: 1 } },
  { label: 'Daily', value: { repeat: msInDay } },
  {
    label: `Weekly (every ${weekDayNames[activeDay.getDay()]})`,
    value: { repeatDays: [activeDay.getDay()] }
  },
  {
    label: 'Every weekday (Mon - Fri)',
    value: { repeatDays: [1, 2, 3, 4, 5] }
  },
  {
    label: `Monthly (every ${activeDay.getDate()} date)`,
    value: { repeatMonthDay: activeDay.getDate() }
  },
  {
    label: `Yearly (every ${
      monthNames[activeDay.getMonth()]
    } ${activeDay.getDate()})`,
    value: { repeatDate: [activeDay.getMonth(), activeDay.getDate()] }
  }
]

export const selectedTypesToArray = (selecedTypes: {
  [key: string]: boolean
}) => {
  return Object.keys(selecedTypes).filter(type => selecedTypes[type])
}
