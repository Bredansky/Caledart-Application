import React, { useContext, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  getMonthTable,
  selectedTypesToArray,
  getWeekTable
} from '../../../helpers'
import { EventContext } from '../../../providers/Event'
import CalendarSquare from './CalendarSquare/CalendarSquare.component'
import { DateObject } from '../../../models'
import { screenWidth } from '../../../constants'

const styles = StyleSheet.create({
  monthView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 8,
    width: screenWidth
  }
})

interface CalendarPageProps {
  mode: string
  selectedTypes: { [key: string]: boolean }
  item: DateObject
  activeDay: Date
  onActiveDay: (day: Date) => void
}

export const CalendarPage = ({
  mode,
  selectedTypes,
  item,
  activeDay,
  onActiveDay
}: CalendarPageProps) => {
  const { eventList } = useContext(EventContext)
  const typesArray = selectedTypesToArray(selectedTypes)
  // TODO: Loading like eventList getting to avoid extra renders 😢
  let pageData
  if (mode === 'Week') {
    pageData =
      eventList && eventList.length
        ? getWeekTable(
            item.year,
            item.month as number,
            item.day as number,
            eventList,
            typesArray
          )
        : getWeekTable(item.year, item.month as number, item.day as number)
  } else {
    pageData =
      eventList && eventList.length
        ? getMonthTable(item.year, item.month as number, eventList, typesArray)
        : getMonthTable(item.year, item.month as number)
  }

  return (
    <Fragment>
      {!pageData ? null : (
        <View style={styles.monthView}>
          {pageData.map(square => (
            <CalendarSquare
              key={square.date.getTime()}
              square={square}
              activeDay={activeDay}
              onActiveDay={onActiveDay}
            />
          ))}
        </View>
      )}
    </Fragment>
  )
}

export default React.memo(CalendarPage)
