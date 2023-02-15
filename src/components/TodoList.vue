<script setup>
import { ref, onMounted } from "vue";
import { useTodoListStore } from "@/stores/todoList";
import { storeToRefs } from "pinia";
import { CheckIcon, XMarkIcon, PencilIcon } from "@heroicons/vue/24/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const store = useTodoListStore();
const { todoList } = storeToRefs(store);
const { toggleCompleted, deleteTodo, editTodo } = store;
const open = ref(false);
const idTodo = ref("");
const todo = ref("");
onMounted(() => {
  store.fetchTodoList();
});

function editTodoModal(id, title) {
  console.log(id, title);
  todo.value = title;
  idTodo.value = id;
  open.value = true;
}
</script>

<template>
  <div>
    <div class="mt-6 flow-root mx-auto max-w-3xl max-h-screen px-4">
      <ul role="list" class="-my-5 divide-y divide-gray-200">
        <li v-for="todo in todoList" :key="todo.id" class="py-4">
          <div class="flex items-center space-x-4">
            <div class="min-w-0 flex-1" :class="{ completed: todo.completed }">
              <p class="truncate font-medium text-gray-900">
                {{ todo.title }}
              </p>
            </div>
            <div>
              <button
                @click.stop="editTodoModal(todo.id, todo.title)"
                class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-orange-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <PencilIcon class="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                @click.stop="toggleCompleted(todo.id)"
                class="ml-3 flex-shrink-0 rounded-full bg-gray-800 p-1 text-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <CheckIcon class="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                @click.stop="deleteTodo(todo.id)"
                class="ml-3 flex-shrink-0 rounded-full bg-gray-800 p-1 text-red-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    >Edit todo</DialogTitle
                  >
                  <div class="mt-2">
                    <input
                      v-model="todo"
                      type="text"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 mr-4"
                      placeholder="Add new todo"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:pl-4">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                  @click="
                    editTodo(idTodo, todo);
                    open = false;
                  "
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="open = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
.completed {
  @apply line-through;
}
</style>
