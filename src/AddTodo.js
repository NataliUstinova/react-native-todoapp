import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native';

const AddTodo = ({ onSubmit, todos }) => {
  const [value, setValue] = useState('');
  const titleInputRef = useRef(null); // Create a ref for the input field

  const pressHandler = () => {
    if (value.trim() !== '') {
      Keyboard.dismiss();
      // Check if the todo title already exists
      const isTodoExist = todos.some(todo => todo.title === value.trim());
      if (isTodoExist) {
        // Handle the case where the todo title already exists (e.g., show an alert)
        Alert.alert("This task already exists",null, [
          {
            text: 'OK',
            onPress: () => {
              titleInputRef.current.focus(); // Focus on the input field after alert
            },
          },
        ]);
         // Exit the function without adding the duplicate todo
      } else {
        onSubmit(value);
        setValue('');
      }
    } else {
      // Show an alert for an empty todo
      Alert.alert('Todo should not be empty', null, [
        {
          text: 'OK',
          onPress: () => {
            titleInputRef.current.focus(); // Focus on the input field after alert
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        ref={titleInputRef} // Set the ref for the input field
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Enter todo..."
        autoCorrect={false}
        autoCapitalize="none"
        onSubmitEditing={pressHandler}
      />
      <Button title="Add" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '70%',
    borderBottomColor: '#3949ab',
    borderStyle: 'solid',
    borderBottomWidth: 2,
  },
});

export default AddTodo;
