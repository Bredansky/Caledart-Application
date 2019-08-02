import React, { Fragment, useContext } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import { Colors } from '../../../constants'
import { EventContext } from '../../../providers/Event'
import { eventsForDay, selectedTypesToArray } from '../../../helpers'
import { EventInterface } from '../../../models'

const styles = StyleSheet.create({
  list: {
    borderRadius: 25,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 8
  },
  tinyCircle: {
    width: 8,
    height: 8,
    borderRadius: 100,
    marginRight: 5
  },
  separator: {
    marginTop: 2,
    marginBottom: 2,
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 1
  }
})

interface EventListItem {
  item: EventInterface
  onOpenModal: (eventData?: EventInterface) => void
}

const Item = ({ item, onOpenModal }: EventListItem) => (
  <TouchableOpacity onPress={() => onOpenModal(item)}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={[styles.tinyCircle, { backgroundColor: Colors[item.type] }]}
      />
      <View>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {`${item.name} ${item.location ? `at ${item.location}` : ''}`}
        </Text>
      </View>
    </View>
    <Text numberOfLines={1} ellipsizeMode="tail">
      {item.description ? item.description : item.type}
    </Text>
  </TouchableOpacity>
)

const ItemMem = React.memo(Item)

interface EventList {
  selectedTypes: { [key: string]: boolean }
  onOpenModal: (eventData?: EventInterface) => void
  activeDay: Date
}

const EventList = ({ selectedTypes, activeDay, onOpenModal }: EventList) => {
  const { eventList } = useContext(EventContext)
  const typesArray = selectedTypesToArray(selectedTypes)
  const dayEvents = eventList
    ? eventsForDay(activeDay, eventList, typesArray)
    : []
  return (
    <Fragment>
      {!dayEvents.length ? (
        <View style={styles.list}>
          <Text>No events for today :)</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          data={dayEvents}
          renderItem={({ item }) => (
            <ItemMem onOpenModal={onOpenModal} item={item} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </Fragment>
  )
}

export default EventList
