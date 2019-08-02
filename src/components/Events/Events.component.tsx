import React from 'react'
import { View, StyleSheet } from 'react-native'

import FloatButton from '../FloatButtonAdd'
import EventModal from './EventModal'
import EventList from './EventList'
import { EventInterface } from '../../models'
import { Colors } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGrey
  }
})

interface EventsComponentsProps {
  activeDay: Date
  selectedTypes: { [key: string]: boolean }
  isNew: boolean
  eventData: EventInterface | null
  isVisible: boolean
  handleCloseModal: () => void
  onOpenModal: (eventData?: EventInterface) => void
}

const EventsComponent = ({
  selectedTypes,
  isNew,
  eventData,
  activeDay,
  isVisible,
  handleCloseModal,
  onOpenModal
}: EventsComponentsProps) => {
  return (
    <View style={styles.container}>
      <EventList
        selectedTypes={selectedTypes}
        activeDay={activeDay}
        onOpenModal={onOpenModal}
      />
      <FloatButton onPress={onOpenModal} />
      <FloatButton onPress={onOpenModal} />
      <EventModal
        eventData={eventData}
        isNew={isNew}
        activeDay={activeDay}
        isVisible={isVisible}
        handleCloseModal={handleCloseModal}
      />
    </View>
  )
}

export default React.memo(EventsComponent)
