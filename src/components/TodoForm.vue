<script setup>
import { ref } from "vue";
import { useTodoListStore } from "@/stores/todoList";
const todo = ref("");
const store = useTodoListStore();
function addItemAndClear(item) {
  if (item.length === 0) {
    return;
  }
  // invokes function in the store:
  store.addTodo(item);
  todo.value = "";
}
</script>

<template>
  <div class="bg-white px-4 py-5 sm:px-6 mb-2">
    <h3 class="text-3xl font-bold leading-6 text-gray-900 text-center">Items</h3>
  </div>
  <form @submit.prevent="addItemAndClear(todo)" class="flex mt-4">
    <input
      v-model="todo"
      type="text"
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 mr-4"
      placeholder="Add new todo"
    />
    <button
      type="submit"
      class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-10 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add
    </button>
  </form>
</template>

<style scoped></style>
