import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewToken
} from 'react-native'
import CalendarHeader from './CalendarHeader'
import CalendarPage from './CalendarPage'
import { screenWidth } from '../../constants'
import { DateObject } from '../../models'

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: 'white'
  }
})

interface CalendarComponentProps {
  data: DateObject[]
  onSetRef: (ref: any) => void
  currentDate: DateObject
  activeDay: Date
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  onViewableItemsChanged: ({
    viewableItems
  }: {
    viewableItems: ViewToken[]
  }) => void
  onActiveDay: (day: Date) => void
  handleChangeMode: (mode: string) => void
  selectedTypes: { [key: string]: boolean }
  handleSelectType: (name: string, value: boolean) => void
  mode: string
}

const CalendarComponent = ({
  data,
  onSetRef,
  currentDate,
  activeDay,
  onScroll,
  onViewableItemsChanged,
  onActiveDay,
  handleChangeMode,
  selectedTypes,
  handleSelectType,
  mode
}: CalendarComponentProps) => (
  <View style={styles.calendarContainer}>
    <CalendarHeader
      mode={mode}
      onChangeMode={handleChangeMode}
      selectedTypes={selectedTypes}
      onSelectType={handleSelectType}
      currentDate={currentDate}
    />
    <FlatList
      ref={onSetRef}
      data={data}
      onMomentumScrollEnd={onScroll}
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      horizontal
      initialScrollIndex={1}
      windowSize={2}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
      getItemLayout={(listData, index) => {
        return { length: screenWidth, offset: screenWidth * index, index }
      }}
      renderItem={({ item }) => (
        <CalendarPage
          mode={mode}
          activeDay={activeDay}
          selectedTypes={selectedTypes}
          onActiveDay={onActiveDay}
          item={item}
        />
      )}
    />
  </View>
)

export default React.memo(CalendarComponent)
