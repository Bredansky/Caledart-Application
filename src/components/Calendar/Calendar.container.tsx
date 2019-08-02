import React, { ReactNode } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken
} from 'react-native'

import { calculateDate, calculateWeek } from '../../helpers'
import CalendarComponent from './Calendar.component'
import { monthNames, screenWidth } from '../../constants'
import { DateObject } from '../../models/DateObject.model'

interface CalendarContainerProps {
  activeDay: Date
  handleActiveDay: (day: Date) => void
  selectedTypes: { [key: string]: boolean }
  handleSelectType: (name: string, value: boolean) => void
}

interface CalendarComponentState {
  data: DateObject[]
  currentDate: DateObject
  mode: string
}
class Calendar extends React.PureComponent<
  CalendarContainerProps,
  CalendarComponentState
> {
  flatListRef: any

  initialMonth: DateObject[]

  initialWeek: DateObject[]

  constructor(props: CalendarContainerProps) {
    super(props)

    const { activeDay } = this.props

    this.initialMonth = [
      calculateDate(activeDay.getFullYear(), activeDay.getMonth(), -1),
      { year: activeDay.getFullYear(), month: activeDay.getMonth() },
      calculateDate(activeDay.getFullYear(), activeDay.getMonth(), 1)
    ]

    this.initialWeek = [
      calculateWeek(
        activeDay.getFullYear(),
        activeDay.getMonth(),
        activeDay.getDate(),
        -1
      ),
      {
        year: activeDay.getFullYear(),
        month: activeDay.getMonth(),
        day: activeDay.getDate()
      },
      calculateWeek(
        activeDay.getFullYear(),
        activeDay.getMonth(),
        activeDay.getDate(),
        1
      )
    ]

    this.state = {
      currentDate: {
        year: activeDay.getFullYear(),
        month: monthNames[activeDay.getMonth()]
      },
      data: [...this.initialMonth],
      mode: 'Month'
    }
  }

  handleChangeMode = (newMode: string) => {
    const { mode } = this.state
    if (newMode === mode) return
    if (newMode === 'Week') {
      this.setState({ data: this.initialWeek, mode: newMode })
    } else {
      this.setState({ data: this.initialMonth, mode: newMode })
    }
    this.flatListRef.scrollToIndex({ animated: false, index: 1 })
    const { handleActiveDay } = this.props
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    handleActiveDay(today)
  }

  handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { data } = this.state
    const currentOffset = e.nativeEvent.contentOffset.x
    if (currentOffset === 0) this.loadLeft()
    if (
      Math.round(currentOffset) === Math.round(screenWidth * (data.length - 1))
    )
      this.loadRight()
  }

  loadLeft() {
    const { data, mode } = this.state
    let newDate
    if (mode === 'Week') {
      const { year, month, day } = data[0]
      newDate = [
        calculateWeek(year, month as number, day as number, -1),
        ...data
      ]
    } else {
      const { year, month } = data[0]
      newDate = [calculateDate(year, month as number, -1), ...data]
    }
    this.flatListRef.scrollToIndex({ animated: false, index: 1 })
    this.setState({ data: newDate })
  }

  loadRight() {
    const { data, mode } = this.state
    let newDate
    if (mode === 'Week') {
      const { year, month, day } = data[data.length - 1]
      newDate = [
        ...data,
        calculateWeek(year, month as number, day as number, 1)
      ]
    } else {
      const { year, month } = data[data.length - 1]
      newDate = [...data, calculateDate(year, month as number, 1)]
    }
    this.setState({ data: newDate })
  }

  handleViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: ViewToken[]
  }) => {
    const { year, month } = viewableItems[0].item
    this.setState({
      currentDate: { year, month: monthNames[month] }
    })
  }

  handleSetRef = (list: ReactNode) => {
    this.flatListRef = list
  }

  render() {
    const {
      handleActiveDay,
      activeDay,
      selectedTypes,
      handleSelectType
    } = this.props
    return (
      <CalendarComponent
        handleChangeMode={this.handleChangeMode}
        onActiveDay={handleActiveDay}
        activeDay={activeDay}
        selectedTypes={selectedTypes}
        handleSelectType={handleSelectType}
        onViewableItemsChanged={this.handleViewableItemsChanged}
        onScroll={this.handleScroll}
        onSetRef={this.handleSetRef}
        {...this.state}
      />
    )
  }
}

export default Calendar
