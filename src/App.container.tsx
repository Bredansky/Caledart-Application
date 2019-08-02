import React, { PureComponent } from 'react'
import { EventProvider } from './providers/Event'
import AppComponent from './App.component'
import { eventTypes } from './constants/config'

const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

export default class App extends PureComponent {
  // TODO: Move this state to separate provider
  state = {
    activeDay: today,
    selectedTypes: {}
  }

  componentDidMount() {
    const defaultSelection: { [key: string]: boolean } = {}
    eventTypes.forEach(type => {
      defaultSelection[type] = true
    })
    this.setState({ selectedTypes: defaultSelection })
  }

  handleActiveDay = (date: Date) => {
    this.setState({ activeDay: date })
  }

  handleSelectType = (name: string, value: boolean) => {
    const { selectedTypes } = this.state
    const newSelectedTypes = { ...selectedTypes, [name]: value }
    this.setState({ selectedTypes: newSelectedTypes })
  }

  render() {
    return (
      <EventProvider>
        <AppComponent
          handleSelectType={this.handleSelectType}
          handleActiveDay={this.handleActiveDay}
          {...this.state}
        />
      </EventProvider>
    )
  }
}
