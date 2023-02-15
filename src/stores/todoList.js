import { defineStore } from "pinia";
import axios from "axios";

export const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todoList: [],
    id: 0,
  }),
  actions: {
    async fetchTodoList() {
      try {
        console.log("fetching data");
        const data = await axios.get("todo");
        this.todoList = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    addTodo(item) {
      try {
        axios.post("todo", { title: item, completed: false }).then(() => {
          const todolistStore = useTodoListStore();
          todolistStore.fetchTodoList();
        });
      } catch (error) {
        console.log(error);
      }
    },
    editTodo(itemId, item) {
      try {
        axios.put(`todo/${itemId}`, { title: item }).then(() => {
          const todolistStore = useTodoListStore();
          todolistStore.fetchTodoList();
        });
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo(itemId) {
      try {
        axios.delete(`todo/${itemId}`).then(() => {
          const todolistStore = useTodoListStore();
          todolistStore.fetchTodoList();
        });
      } catch (error) {
        console.log(error);
      }
    },
    toggleCompleted(itemId) {
      try {
        axios.post(`todo/${itemId}/complete`).then(() => {
          const todolistStore = useTodoListStore();
          todolistStore.fetchTodoList();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
