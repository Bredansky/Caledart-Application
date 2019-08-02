import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import IconWrapper from '../../../IconWrapper/IconWrapper.component'
import { CloseIcon, AddIcon } from '../../../Icons'
import { FontSizes, screenWidth } from '../../../../constants'
import { EventInterface } from '../../../../models'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    width: screenWidth - 120, // TODO: icon wrapper width to constants
    fontSize: FontSizes.Header,
    textAlign: 'center'
  }
})

interface ModalHeaderProps {
  isNew: boolean
  eventData: EventInterface | null
  onCloseModal: () => void
  onCreateEvent: () => void
}

const ModalHeader = ({
  isNew,
  eventData,
  onCloseModal,
  onCreateEvent
}: ModalHeaderProps) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onCloseModal}>
      <IconWrapper sideSize={60}>
        <CloseIcon width={20} height={20} />
      </IconWrapper>
    </TouchableOpacity>
    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>
      {!eventData ? 'Add new event' : eventData.name}
    </Text>
    <TouchableOpacity onPress={onCreateEvent}>
      <IconWrapper sideSize={60}>
        {!isNew ? null : <AddIcon width={20} height={20} />}
      </IconWrapper>
    </TouchableOpacity>
  </View>
)

ModalHeader.defaultProps = {
  eventData: {}
}

export default ModalHeader
