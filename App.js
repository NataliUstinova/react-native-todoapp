import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import Navbar from "./src/Navbar";
import AddTodo from "./src/AddTodo";
import Todo from "./src/Todo";
import Api from "./Api"; // Import the Api class

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({})
  const [sortedTodos, setSortedTodos] = useState([])
  
  useEffect(() => {
    // Update sortedTodos whenever todos change
    setSortedTodos([...todos].sort((a, b) => (a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1)));
  }, [todos]);
  
  useEffect(() => {
    fetchTodos()
  }, []);

  useEffect(() => {
    getUser(2)
  }, []);
  
  
  const getUser = (userId) => {
    setRefreshing(true);
    setIsLoading(true);
    Api.getUser(userId)
      .then(data => setUser(data))
      .catch(error => console.error(error))
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false); // Set loading to false when the API request is complete
      });
  }
  
  const fetchTodos = (userId) => {
    setRefreshing(true);
    setIsLoading(true); // Set loading to true when making an API request
    Api.fetchTodos(userId)
      .then(data => setTodos(data.reverse()))
      .catch(error => console.error(error))
      .finally(() => {
        setRefreshing(false);
        setIsLoading(false); // Set loading to false when the API request is complete
      });
  };

  const handleAddTodo = (title) => {
    setIsLoading(true); // Set loading to true when adding a todo
    Api.addTodo(title)
      .then((data) => setTodos((prevTodos) => [data, ...prevTodos]))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false)); // Set loading to false when the API request is complete
  };

  const handleRemoveTodo = (id) => {
    setIsLoading(true); // Set loading to true when deleting a todo
    Api.removeTodo(id)
      .then(() => setTodos(prevTodos => prevTodos.filter(item => item.id !== id)))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false)); // Set loading to false when the API request is complete
  };

  const handleEditTodo = (id, newTitle, status) => {
    setIsLoading(true); // Set loading to true when editing a todo
    Api.editTodo(id, newTitle, status)
      .then(() => {
        setTodos(prevTodos => {
          return prevTodos.map(todo =>
            todo.id === id ? {...todo, title: newTitle, isDone: status} : todo
          );
        });
        setEditedTodo(null);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false)); // Set loading to false when the API request is complete
  };
  
  
  
  
  return (
    <View style={styles.page}>
      <Navbar title="My TODOs" user={user} />
      <View style={styles.container}>
        <AddTodo onSubmit={handleAddTodo} todos={todos} />
        {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#3949ab" />}
          <FlatList
            style={styles.todosBlock}
            keyExtractor={item => item.id}
            data={sortedTodos}
            renderItem={({ item }) => (
              <Todo
                todos={todos}
                todo={item}
                onRemove={handleRemoveTodo}
                onEdit={handleEditTodo}
                setEditedTodo={setEditedTodo}
                editedTodo={editedTodo}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={fetchTodos} />
            }
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  todosBlock: {
    // maxHeight: '84%',
    paddingVertical: 10
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
