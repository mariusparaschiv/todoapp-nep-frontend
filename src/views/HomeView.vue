<script setup>
import TodoApp from "../components/TodoApp.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <TodoApp />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
