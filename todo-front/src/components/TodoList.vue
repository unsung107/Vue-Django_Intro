<template>
  <div class="todo-list">
    <div class="card mb-3" v-for="todo in todos" :key="todo.id">
      <div class="card-body d-flex justify-content-between">
        <span>{{ todo.title }}</span>
        <span @click="deleteTodo(todo)">삭제</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_IP = process.env.VUE_APP_SERVER_IP

export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  computed: {
    options() {
      return this.$store.getters.options
    },
  },
  methods: {
    deleteTodo(todo) {
      axios.delete(`${SERVER_IP}/api/v1/todos/${todo.id}/`, this.options)
      .then(response => {  
        console.log(response)
        const idx = this.todos.indexOf(todo)
        if (idx > -1) {
          this.todos.splice(idx, 1)
        }
      })
      .catch(error => {
        console.error(error)
      })
    },
  },
}
</script>

<style>

</style>