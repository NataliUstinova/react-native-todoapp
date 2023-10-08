import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Api from '../Api';

const Todo = ({ todo, onRemove, onEdit, todos }) => {
  const [isDone, setIsDone] = useState(todo.isDone);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const titleInputRef = useRef(null); // Create a ref for the input field

  useEffect(() => {
    setIsDone(todo.isDone);
  }, [todo]);
  
  const handleStrike = () => {
    setIsDone(!isDone);
    Api.updateTodoStatus(todo.id, todo.title, !isDone)
      .then(() => {
        // trigger a re-render by updating the todo state in the parent component
        onEdit(todo.id, todo.title, !isDone);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    // Show an alert dialog for confirmation
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // If the user confirms, call the onRemove function to delete the todo
            onRemove(todo.id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    if (isEditing) {
      if (editedTitle.trim() === '') {
        // Show an alert if the edited title is empty
        Alert.alert('Title cannot be empty.');
        titleInputRef.current.focus(); // Focus on the input field
        return; // Prevent saving an empty title
      }
      // Check if the todo title already exists
      const isTodoExist = todos.some(todo => todo.title === editedTitle.trim());
      if (isTodoExist) {
        // Handle the case where the todo title already exists (e.g., show an alert)
        Alert.alert("This task already exists");
        titleInputRef.current.focus(); // Focus on the input field after alert
        return;
      }
      onEdit(todo.id, editedTitle, todo.isDone);
    }
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (text) => {
    setEditedTitle(text);
  };

  const locale = 'en-Us';
  const options = { month: 'short', day: 'numeric' };

  return (
    <View style={styles.todo}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleStrike}>
          <View
            style={[
              styles.checkbox,
              isDone ? styles.checkboxChecked : null,
            ]}
          >
            {isDone && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
        <View>
          {isEditing ? (
            <TextInput
              ref={titleInputRef} // Set the ref for the input field
              style={styles.editInput}
              onChangeText={handleTitleChange}
              value={editedTitle}
              autoCorrect={false}
              autoCapitalize="none"
              autoFocus={true}
              onBlur={handleEdit}
              onSubmitEditing={handleEdit}
            />
          ) : (
            <Text
              numberOfLines={1}
              style={[styles.todoText, isDone && styles.todoDoneText]}
            >
              {todo.title}
            </Text>
          )}
          <Text style={styles.date}>
            {new Date(todo.createdAt).toLocaleDateString(locale, options)}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleEdit}>
          <Text>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={handleDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#3949ab',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: '#3949ab',
  },
  checkmark: {
    color: '#fff',
  },
  todoText: {
    color: '#000',
    maxWidth: 180,
  },
  date: {
    color: '#000',
    fontSize: 10,
    opacity: 0.4,
  },
  todoDoneText: {
    textDecorationLine: 'line-through',
  },
  editInput: {},
});

export default Todo;
