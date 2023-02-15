<script setup>
import TodoForm from "./TodoForm.vue";
import TodoList from "./TodoList.vue";
</script>

<template>
  <div class="bg-gray-900 py-24 px-6 sm:py-16 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Todo list
      </h2>
    </div>
  </div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <todo-form></todo-form>
    </div>
  </div>
  <todo-list />
</template>

<style scoped></style>
