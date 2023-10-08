class Api {
  constructor() {
    this.BASE_URL = "https://65228aeff43b179384149cd2.mockapi.io/api/v1/";
  }
  
  async getUser(userId) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/${userId}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function to fetch todos
  async fetchTodos() {
    try {
      const response = await fetch(`${this.BASE_URL}/users/2/todos`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function to add a todo
  async addTodo(title) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/2/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function to remove a todo
  async removeTodo(id) {
    try {
      await fetch(`${this.BASE_URL}/users/2/todos/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Function to edit a todo
  async editTodo(id, newTitle, isDone) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/2/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle, isDone: isDone }),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateTodoStatus(id, isDone) {
    try {
      const response = await fetch(`${this.BASE_URL}/users/2/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({isDone: isDone}), // Update the isDone property
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new Api();
