<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const router = useRouter();
    const validation = ref([]);

    const submit = async () => {
      await axios
        .post('/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: password_confirmation.value,
        })
        .then(() => {
          router.push({ path: '/login' });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      submit,
      validation,
    };
  },
};
</script>

<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen">
    <span class="px-2 py-2 mb-4 text-red-600 rounded shadow">
      {{ validation.message }}
    </span>
    <div class="w-full p-6 shadow bg-gray-50 lg:max-w-md">
      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label for="name" class="block text-sm text-gray-800">Name</label>
          <input
            v-model="name"
            name="name"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="email" class="block text-sm text-gray-800">Email</label>
          <input
            v-model="email"
            name="email"
            type="email"
            class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="password" class="block text-sm text-gray-800"
            >Password</label
          >
          <input
            v-model="password"
            name="password"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label for="password" class="block text-sm text-gray-800"
            >Password Confirm</label
          >
          <input
            v-model="password_confirmation"
            name="password_confirmation"
            type="password"
            class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <button
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      </form>
      <p class="mt-8 text-xs font-light text-center text-gray-700">
        Don't have an account?

        <RouterLink
          to="/login"
          class="font-medium text-blue-600 hover:underline"
          >Login</RouterLink
        >

        >
      </p>
    </div>
  </div>
</template>