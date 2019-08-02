import React, { PureComponent, ReactNode } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native'
import { EventContextModel } from './EventContext.model'
import { EventInterface } from '../../models'

export const EventContext = React.createContext(
  ({} as unknown) as EventContextModel
)

interface EventProviderProps {
  children: ReactNode
}

/* eslint react/no-unused-state: off */
export class EventProvider extends PureComponent<
  EventProviderProps,
  EventContextModel
> {
  createEvent = (eventData: EventInterface, cb: () => {}) => {
    AsyncStorage.getItem('eventList').then(value => {
      if (!value) {
        const newList = [eventData]
        AsyncStorage.setItem('eventList', JSON.stringify(newList)).then(() => {
          this.setState({ eventList: newList }, cb || undefined)
        })
      } else {
        const list = JSON.parse(value)
        const newList = [...list, eventData]
        this.setState({ eventList: newList })
        AsyncStorage.setItem('eventList', JSON.stringify(newList)).then(() => {
          this.setState({ eventList: newList }, cb || undefined)
        })
      }
    })
  }

  deleteEvent = (id: number, cb?: () => void) => {
    AsyncStorage.getItem('eventList').then(value => {
      if (!value) {
        Alert.alert('Ooops', 'Event list is already empty')
      } else {
        const list = JSON.parse(value)
        const newList = list.filter((event: EventInterface) => event.id !== id)
        this.setState({ eventList: newList })
        AsyncStorage.setItem('eventList', JSON.stringify(newList)).then(() => {
          this.setState({ eventList: newList }, cb || undefined)
        })
      }
    })
  }

  updateEvent = (eventDate: EventInterface, id: number, cb?: () => void) => {
    AsyncStorage.getItem('eventList').then(value => {
      if (!value) {
        Alert.alert('Ooops', 'Event list is already empty')
      } else {
        const list = JSON.parse(value)
        const index = list.findIndex((event: EventInterface) => event.id === id)
        list[index] = eventDate
        const newList = [...list]
        AsyncStorage.setItem('eventList', JSON.stringify(newList)).then(() => {
          this.setState({ eventList: newList }, cb || undefined)
        })
      }
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('eventList').then(value => {
      const currentList = value ? JSON.parse(value) : null
      this.setState({ eventList: currentList })
    })
  }

  state = {
    eventList: null,
    createEvent: this.createEvent,
    updateEvent: this.updateEvent,
    deleteEvent: this.deleteEvent
  }

  render() {
    const { children } = this.props
    return (
      <EventContext.Provider value={this.state}>
        {children}
      </EventContext.Provider>
    )
  }
}
