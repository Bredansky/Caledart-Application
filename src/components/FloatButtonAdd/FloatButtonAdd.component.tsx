import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import IconWrapper from '../IconWrapper'
import { AddIcon } from '../Icons'

interface FloatButtonProps {
  onPress: () => void
}

export default ({ onPress }: FloatButtonProps) => (
  <TouchableOpacity onPress={() => onPress()} style={styles.button}>
    <IconWrapper sideSize={60}>
      <AddIcon color="white" width={30} height={30} />
    </IconWrapper>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#0077c2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '5%',
    bottom: '5%'
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 4
  }
})
