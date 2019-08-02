import React from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native'
import { screenWidth } from '../../../../constants'
import { CalendarDay } from '../../../../models'

const styles = StyleSheet.create({
  activeText: {
    color: 'white'
  },
  activeDayCircle: {
    backgroundColor: '#0077c2'
  },
  activeTinyCircle: {
    backgroundColor: 'white'
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center'
  },
  dayView: {
    width: Math.floor(screenWidth / 7),
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyCircle: {
    width: 5,
    height: 5,
    top: '10%',
    left: '44%',
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'red'
  },
  grayDay: {
    color: 'grey'
  }
})

interface CalendarSquareProps {
  activeDay: Date
  onActiveDay: (day: Date) => void
  square: CalendarDay
}

const CalendarSquare = ({
  activeDay,
  onActiveDay,
  square
}: CalendarSquareProps) => {
  const isActive = square.date.getTime() === activeDay.getTime()
  return (
    <View style={styles.dayView}>
      <TouchableWithoutFeedback onPress={() => onActiveDay(square.date)}>
        <View style={[styles.dayCircle, isActive && styles.activeDayCircle]}>
          {square.isEvent ? (
            <View
              style={[styles.tinyCircle, isActive && styles.activeTinyCircle]}
            />
          ) : null}
          <Text
            style={[
              styles.dayText,
              square.isGray && styles.grayDay,
              isActive && styles.activeText
            ]}
          >
            {square.day}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default React.memo(CalendarSquare)
