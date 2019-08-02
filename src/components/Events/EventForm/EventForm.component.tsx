import React from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import { getRepeatOptions, displayDate } from '../../../helpers'
import { eventTypes, Colors } from '../../../constants'
import { EventInterface, Repeat } from '../../../models'
import Select from '../../Select/Select.component'

const styles = StyleSheet.create({
  formBlock: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#fafafa',
    borderBottomWidth: 2
  },
  rowText: {
    fontSize: 16
  },
  picker: {
    ...Platform.select({
      android: {
        width: '50%',
        height: 40
      },
      ios: {
        width: 40,
        height: 40
      }
    })
  },
  textInput: {
    height: 50,
    borderColor: '#fafafa',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingBottom: 8,
    marginBottom: 10
  },
  disabledText: {
    color: 'grey',
    paddingRight: 16
  }
})

interface EventFormProps extends EventInterface {
  isNew: boolean
  onUpdateEvent: () => void
  onDeleteEvent: () => void
  onSetForm: (field: string, value: string | Date | Repeat) => void
}

export default ({
  isNew,
  onUpdateEvent,
  onDeleteEvent,
  onSetForm,
  name,
  description,
  type,
  repeat,
  location,
  fromDate
}: EventFormProps) => {
  const repeatOptionDate = isNew ? fromDate : new Date(fromDate)
  const repeatOptions = getRepeatOptions(repeatOptionDate as Date)
  const repeatChangeIOS = (itemValue: Repeat) => onSetForm('repeat', itemValue)
  const repeatChangeAndroid = (itemValue: Repeat, itemIndex: number) =>
    onSetForm('repeat', repeatOptions[itemIndex])
  const repeatChangeValue =
    Platform.OS === 'ios' ? repeatChangeIOS : repeatChangeAndroid
  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={16} enabled>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.formBlock}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onSetForm('name', text)}
            value={name}
            placeholder="Event name"
          />
          <View style={styles.formRow}>
            <Text style={styles.rowText}>Type</Text>
            <Select
              labelStyle={styles.rowText}
              selectedValue={type}
              selectOptions={eventTypes}
              style={styles.picker}
              onValueChange={itemValue => onSetForm('type', itemValue)}
            />
          </View>
        </View>
        <View style={styles.formBlock}>
          <View style={styles.formRow}>
            <Text style={styles.rowText}>From</Text>
            <Text style={styles.disabledText}>
              {displayDate(fromDate as string)}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.rowText}>Repeat</Text>
            <Select
              labelStyle={styles.rowText}
              selectedValue={repeat.label}
              isLabel
              selectOptions={repeatOptions}
              style={styles.picker}
              onValueChange={repeatChangeValue}
            />
          </View>
        </View>
        <View style={styles.formBlock}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => onSetForm('location', text)}
            value={location}
            placeholder="Location"
          />
          <TextInput
            multiline
            style={[styles.textInput, { textAlignVertical: 'top' }]}
            onChangeText={text => onSetForm('description', text)}
            value={description}
            placeholder="Description"
          />
        </View>
        {isNew ? null : (
          <View
            style={{
              flexDirection: 'row',
              margin: 8,
              justifyContent: 'center'
            }}
          >
            <View style={{ width: '40%' }}>
              <Button
                onPress={onUpdateEvent}
                title="Update"
                color={Colors.Event}
              />
            </View>
            <View style={{ marginLeft: 10, width: '40%' }}>
              <Button
                onPress={onDeleteEvent}
                title="Delete"
                color={Colors.Warning}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
