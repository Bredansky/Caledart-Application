import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../Icons.model'

const Add = ({ style, width, height, color }: IconProps) => (
  <Svg style={style} width={width} height={height} viewBox="0 0 18 18">
    <Path
      fill="none"
      fillRule="evenodd"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 9V1v8H1h8zm0 0v8-8h8-8z"
    />
  </Svg>
)

Add.defaultProps = {
  color: '#000',
  width: 18,
  height: 18
}

export default Add
