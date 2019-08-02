import React from 'react'
import {
  Platform,
  Picker,
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet,
  Text
} from 'react-native'
import IconWrapper from '../IconWrapper'
import ArrowDown from '../Icons/ArrowDown'
import { Repeat } from '../../models'

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

interface SelectProps {
  onValueChange: (itemValue: any, itemIndex?: any) => void
  selectOptions: (string | Repeat)[]
  selectedValue: string
  isLabel?: boolean
  labelStyle?: { [key: string]: string | number }
  style: { [key: string]: string | number }
}

const SelectIOS = ({
  labelStyle,
  selectedValue,
  style,
  onValueChange,
  selectOptions,
  isLabel
}: SelectProps) => {
  const showActionSheet = () => {
    const labels = isLabel
      ? (selectOptions as Repeat[]).map(o => o.label)
      : selectOptions
    const sheetOptions = ['cancel', ...labels]
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: sheetOptions as string[],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) return
        onValueChange(selectOptions[buttonIndex - 1])
      }
    )
  }
  return (
    <TouchableOpacity onPress={showActionSheet} style={styles.select}>
      {labelStyle ? <Text style={labelStyle}>{selectedValue}</Text> : null}
      <IconWrapper style={style} sideSize={50}>
        <ArrowDown height={20} width={20} />
      </IconWrapper>
    </TouchableOpacity>
  )
}

const SelectAndroid = ({
  selectedValue,
  style,
  onValueChange,
  selectOptions,
  isLabel
}: SelectProps) => (
  <Picker
    selectedValue={selectedValue}
    style={style}
    onValueChange={onValueChange}
  >
    {selectOptions.map(option => (
      <Picker.Item
        key={isLabel ? (option as Repeat).label : (option as string)}
        label={isLabel ? (option as Repeat).label : (option as string)}
        value={isLabel ? (option as Repeat).label : (option as string)}
      />
    ))}
  </Picker>
)

const memoSelectAndroid = React.memo(SelectAndroid)
const memoSelectIOS = React.memo(SelectIOS)

export default Platform.OS === 'ios' ? memoSelectIOS : memoSelectAndroid
