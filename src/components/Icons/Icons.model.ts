export interface SvgProps {
  width?: number
  height?: number
  style?: { [key: string]: string | number }
}

export interface IconProps extends SvgProps {
  color?: string
}
