import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../Icons.model'

const Close = ({ color, width, height }: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 16">
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 8l7-7-7 7-7-7 7 7zm0 0l-7 7 7-7 7 7-7-7z"
    />
  </Svg>
)

Close.defaultProps = {
  width: 16,
  height: 16,
  color: '#000'
}

export default Close
