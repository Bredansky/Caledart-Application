import React from 'react'
import { Modal, StyleSheet, SafeAreaView } from 'react-native'
import EventForm from '../EventForm'
import ModalHeader from './ModalHeader'
import { Repeat, EventInterface } from '../../../models'

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fafafa',
    flex: 1
  }
})

interface EventModalComponentProps extends EventInterface {
  handleUpdateEvent: () => void
  handleDeleteEvent: () => void
  handleCreateEvent: () => void
  handleSetForm: (field: string, value: string | Date | Repeat) => void
  eventData: EventInterface | null
  isNew: boolean
  isVisible: boolean
  handleCloseReset: () => void
}

export default ({
  handleUpdateEvent,
  handleDeleteEvent,
  repeat,
  name,
  description,
  type,
  location,
  fromDate,
  handleCreateEvent,
  handleSetForm,
  eventData,
  isNew,
  isVisible,
  handleCloseReset
}: EventModalComponentProps) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={isVisible}
    onRequestClose={() => {
      handleCloseReset()
    }}
  >
    <SafeAreaView style={styles.modal}>
      <ModalHeader
        isNew={isNew}
        eventData={eventData}
        onCreateEvent={handleCreateEvent}
        onCloseModal={handleCloseReset}
      />
      <EventForm
        name={name}
        repeat={repeat}
        description={description}
        type={type}
        location={location}
        fromDate={fromDate}
        isNew={isNew}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
        onSetForm={handleSetForm}
      />
    </SafeAreaView>
  </Modal>
)
