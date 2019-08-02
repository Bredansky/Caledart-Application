import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../Icons.model'

const ArrowDown = ({ color, width, height }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path stroke={color} d="M7 10l5 5 5-5z" />
    <Path fill="none" d="M0 0h24v24H0z" />
  </Svg>
)

ArrowDown.defaultProps = {
  width: 16,
  height: 16,
  color: '#000'
}

export default ArrowDown
