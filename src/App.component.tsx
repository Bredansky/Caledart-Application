import React, { Fragment } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import Calendar from './components/Calendar'
import Events from './components/Events'

interface AppComponentProps {
  selectedTypes: { [key: string]: boolean }
  activeDay: Date
  handleSelectType: (name: string, value: boolean) => void
  handleActiveDay: (day: Date) => void
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})

const App = ({
  selectedTypes,
  handleSelectType,
  handleActiveDay,
  activeDay
}: AppComponentProps) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Calendar
          selectedTypes={selectedTypes}
          handleSelectType={handleSelectType}
          handleActiveDay={handleActiveDay}
          activeDay={activeDay}
        />
        <Events activeDay={activeDay} selectedTypes={selectedTypes} />
      </SafeAreaView>
    </Fragment>
  )
}

export default React.memo(App)
