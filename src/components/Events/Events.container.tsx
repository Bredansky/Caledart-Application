import React, { PureComponent } from 'react'

import EventComponent from './Events.component'
import { EventInterface } from '../../models'

interface EventsContainerProps {
  activeDay: Date
  selectedTypes: { [key: string]: boolean }
}

interface EventContainerState {
  isVisible: boolean
  isNew: boolean
  eventData: EventInterface | null
}

class Events extends PureComponent<EventsContainerProps, EventContainerState> {
  constructor(props: EventsContainerProps) {
    super(props)

    this.state = {
      isVisible: false,
      isNew: true,
      eventData: null
    }
  }

  handleOpenModal = (eventData?: EventInterface) => {
    this.setState({
      isVisible: true,
      isNew: !eventData,
      eventData: eventData || null
    })
  }

  handleCloseModal = () => {
    this.setState({
      isVisible: false,
      isNew: true,
      eventData: null
    })
  }

  render() {
    const { activeDay, selectedTypes } = this.props
    return (
      <EventComponent
        activeDay={activeDay}
        selectedTypes={selectedTypes}
        onOpenModal={this.handleOpenModal}
        handleCloseModal={this.handleCloseModal}
        {...this.state}
      />
    )
  }
}

export default Events
