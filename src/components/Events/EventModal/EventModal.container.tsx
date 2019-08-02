import React, { PureComponent } from 'react'
import { Alert } from 'react-native'
import EventModalComponent from './EventModal.component'
import { EventContext } from '../../../providers/Event'
import { EventInterface, Repeat } from '../../../models'

interface EventModalProps {
  activeDay: Date
  isNew: boolean
  eventData: EventInterface | null
  handleCloseModal: () => void
  isVisible: boolean
}

class EventModal extends PureComponent<EventModalProps, EventInterface> {
  initialState: EventInterface

  constructor(props: EventModalProps) {
    super(props)

    this.initialState = {
      name: '',
      type: 'Event',
      repeat: { label: 'One time event', value: { repeat: 1 } },
      location: '',
      description: '',
      fromDate: '',
      id: 0
    }
  }

  componentDidMount() {
    const { activeDay } = this.props
    this.setState({
      ...this.initialState,
      id: Date.now(),
      fromDate: activeDay
    })
  }

  /* eslint react/no-did-update-set-state: "off" */
  componentDidUpdate(prevProps: EventModalProps) {
    const { isNew, eventData, activeDay } = this.props
    if (
      prevProps.isNew !== isNew ||
      prevProps.activeDay !== activeDay ||
      prevProps.eventData !== eventData
    ) {
      if (isNew && !eventData) {
        this.setState({
          ...this.initialState,
          id: Date.now(),
          fromDate: activeDay
        })
      } else {
        this.setState(eventData)
      }
    }
  }

  handleCreateEvent = () => {
    const { name } = this.state
    const eventState = this.context
    if (!name) {
      Alert.alert('Oops...', 'Please, enter name to create an event')
      return
    }
    eventState.createEvent(this.state, () => {
      this.handleCloseReset()
    })
  }

  handleUpdateEvent = () => {
    const { name, id } = this.state
    const eventState = this.context
    if (!name) {
      Alert.alert('Oops...', 'Please, enter name to edit an event')
      return
    }
    eventState.updateEvent(this.state, id, () => {
      Alert.alert('Yeah', 'Event was updated', [
        { text: 'OK', onPress: this.handleCloseReset }
      ])
    })
  }

  handleDeleteEvent = () => {
    const { id } = this.state
    const eventState = this.context
    eventState.deleteEvent(id, () => {
      Alert.alert('Yeah', 'Event was deleted', [
        { text: 'OK', onPress: this.handleCloseReset }
      ])
    })
  }

  handleSetForm = (fieldName: string, value: string | Date | Repeat) => {
    this.setState({ [fieldName]: value } as any)
  }

  handleCloseReset = () => {
    const { activeDay } = this.props
    this.setState({
      ...this.initialState,
      id: Date.now(),
      fromDate: activeDay
    })
    const { handleCloseModal } = this.props
    handleCloseModal()
  }

  render() {
    const { eventData, isNew, isVisible } = this.props
    return (
      <EventModalComponent
        eventData={eventData}
        isNew={isNew}
        isVisible={isVisible}
        {...this.state}
        handleCreateEvent={this.handleCreateEvent}
        handleDeleteEvent={this.handleDeleteEvent}
        handleUpdateEvent={this.handleUpdateEvent}
        handleSetForm={this.handleSetForm}
        handleCloseReset={this.handleCloseReset}
      />
    )
  }
}

EventModal.contextType = EventContext
export default EventModal
