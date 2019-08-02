import React from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import {
  shortWeekDayNames,
  screenWidth,
  eventTypes,
  Colors,
  FontSizes
} from '../../../constants'
import { DateObject } from '../../../models'
import Select from '../../Select/Select.component'

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'flex-end'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey,
    padding: 12
  },
  switchGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker: {
    width: 50,
    height: 50,
    marginLeft: -15
  },
  mainText: {
    fontSize: FontSizes.Header
  },
  dayName: {
    width: screenWidth / 7,
    textAlign: 'center'
  },
  switch: {
    ...Platform.select({
      ios: {
        transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }]
      }
    })
  }
})

interface CalendarHeaderProps {
  onChangeMode: (mode: string) => void
  mode: string
  currentDate: DateObject
  onSelectType: (type: string, value: boolean) => void
  selectedTypes: { [key: string]: boolean }
}

const CalendarHeader = ({
  onChangeMode,
  mode,
  currentDate,
  onSelectType,
  selectedTypes
}: CalendarHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.modeContainer}>
          <Text style={styles.mainText}>
            {currentDate.month.toString().slice(0, 3)}, {currentDate.year}
          </Text>
          <Select
            selectedValue={mode}
            style={styles.picker}
            onValueChange={itemValue => onChangeMode(itemValue as string)}
            selectOptions={['Month', 'Week']}
          />
        </View>
        <View style={styles.switchGroup}>
          {eventTypes.map(type => (
            <View key={type} style={styles.switchContainer}>
              <Text>{type}</Text>
              <Switch
                trackColor={{ false: Colors.LightGrey, true: Colors.LightBlue }}
                style={styles.switch}
                thumbColor={Colors[type]}
                onValueChange={value => onSelectType(type, value)}
                value={selectedTypes[type]}
              />
            </View>
          ))}
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {shortWeekDayNames.map(day => (
          <Text key={day} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  )
}

export default React.memo(CalendarHeader)
