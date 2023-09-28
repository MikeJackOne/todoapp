<template>
  <div class="container mt-5">
    <h1 class="text-center mb-5">Todo App with Vue.js & Bootstrap</h1>
    <div class="row mb-4">
      <div class="col-md-9">
        <input
          type="text"
          class="form-control"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo"
        />
      </div>
      <div class="col-md-3">
        <button
          class="btn btn-outline-primary"
          style="width: 80px;"
          @click="addTodo"
        >
          Add
        </button>
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center mb-2"
        v-for="(todo, index) in todos"
        :key="todo.id"
      >
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            :id="'customCheck' + todo.id"
            v-model="todo.completed"
            @change="toggleCompletion(todo)"
          />
          <label class="custom-control-label" :for="'customCheck' + todo.id">
            <span :class="{ 'completed': todo.completed }">{{ todo.text }}</span>
          </label>
        </div>
        <button
          class="btn btn-outline-danger"
          @click="deleteTodo(index, todo.id)"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTodo: '',
      todos: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      this.todos = response.data;
    } catch (error) {
      console.error('There was an error!', error);
    }
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim() === '') return;
      try {
        const response = await axios.post('http://localhost:5000/todos', {
          text: this.newTodo,
          completed: false,
        });
        this.todos.push(response.data.todo);
        this.newTodo = '';
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    async deleteTodo(index, id) {
      try {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        this.todos.splice(index, 1);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    async toggleCompletion(todo) {
      try {
        await axios.put(`http://localhost:5000/todos/${todo.id}`, {
          text: todo.text,
          completed: todo.completed,
        });
      } catch (error) {
        console.error('There was an error!', error);
        todo.completed = !todo.completed; // Revert the change on error
      }
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: grey;
}

.list-group-item {
  border-radius: 15px;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background-color: #007bff;
  border-color: #007bff;
}

.form-control {
  border-radius: 15px;
  border: 1px solid #007bff;
}

.btn-outline-primary {
  border-radius: 15px;
}

.btn-outline-danger {
  border-radius: 15px;
}
</style>
