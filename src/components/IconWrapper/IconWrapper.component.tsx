import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface IconWrapperProps {
  children: ReactNode
  sideSize: number
  style?: { [key: string]: string | number }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const IconWrapper = ({ children, sideSize, style }: IconWrapperProps) => (
  <View
    style={[styles.container, { width: sideSize, height: sideSize }, style]}
  >
    {children}
  </View>
)

export default IconWrapper
