import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useProfile } from '../save/savecomponent';
import { saveProfile } from '../save/savecomponent';

export default function listpage() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const { getProfile, saveProfile } = useProfile();

  const toggleTaskDone = (index) => { 
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(newTasks);
  };

  useEffect(() => { // Load tasks from storage
    const loadTasks = async () => {
      const loadedTasks = await getProfile();
      setTasks(loadedTasks);
    };
    loadTasks();
  }, []);

  useEffect(() => { // Save tasks to storage
    saveProfile(tasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Todo list</Text>
      <TextInput
        label='Add new task'
        value={text}
        onChangeText={text => setText(text)}
        style={styles.input}
      />
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          if (!text) return
          setTasks([...tasks, { text, done: false }]);
          setText(''); 
          console.log("task " + text + " added");
        }}
        style={styles.button}
      >
        Save
      </Button>
      <ScrollView style={{ width: '100%' }}>
        <Text style={styles.Text}>Tasks</Text>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleTaskDone(index)} style={{ flex: 1 }}> 
              <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                {task.text}
              </Text>
            </TouchableOpacity>
            <Button
              icon="delete"
              mode="contained"
              onPress={() => {
                const newTasks = tasks.filter((_, i) => i !== index);
                setTasks(newTasks);
                console.log("task " + task.text + " deleted");
              }}
              style={styles.button}
            >
              Delete
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  taskText: {
    flex: 1,
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});