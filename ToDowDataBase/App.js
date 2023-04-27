import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Realm from 'realm';

// Define the schema for the todo list items
const ToDoItemSchema = {
  name: 'ToDoItem',
  properties: {
    id: 'int',
    text: 'string'
  }
};

// Define the database configuration
const databaseOptions = {
  path: 'todoList.realm',
  schema: [ToDoItemSchema]
};

function Banner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}> Todo example with Realm and React native</Text>
    </View>

  );
}

function ToDoList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Open the database and get all the todo items
    Realm.open(databaseOptions).then((realm) => {
      const items = realm.objects('ToDoItem');
      setItems(items);
    });
  }, []);

  const addToDoItem = () => {
    if (itemText !== '') {
      // Open the database, add the new todo item, and update the state
      Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
          realm.create('ToDoItem', { id: Math.random(), text: itemText });
          const newItems = realm.objects('ToDoItem');
          setItems(newItems);
          setItemText('');
        });
      });
    }
    Keyboard.dismiss();
  };

  const removeItem = (id) => {
    // Open the database, remove the todo item with the given ID, and update the state
    Realm.open(databaseOptions).then((realm) => {
      realm.write(() => {
        const item = realm.objectForPrimaryKey('ToDoItem', id);
        realm.delete(item);
        const newItems = realm.objects('ToDoItem');
        setItems(newItems);
      });
    });
  };

  return (
    <View>
      <View style={styles.addToDo}>
        <TextInput
          style={styles.addToDoTextInput}
          value={itemText}
          onChangeText={(text) => setItemText(text)}
          placeholder='Write a new todo here!' />
        <Button title='Add'
          color='#635985'
          onPress={addToDoItem}
        />
      </View>
      <ScrollView style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.listItemText}>* {item.text}</Text>
            <Text
              style={styles.listItemDelete}
              onPress={() => removeItem(item.id)}>X
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5
  },
  banner: {
    backgroundColor: '#635985',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  addToDo: {
    flexDirection: 'row',
    marginBottom: 20
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 2,
    flex: 1
  },
  list: {
    color: 'black',
    margin: 2
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  listItemText: {
  },
  listItemDelete: {
    marginStart: 10,
    color: 'white',
    fontWeight: 'bold',
    width: 20,
    height: 20,
    borderRadius: 44 / 2,
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: 'red'
  },
});
