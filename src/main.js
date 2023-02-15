import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "https://todoapp-nep-backend.herokuapp.com/api/";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
axios.defaults.headers["Content-Type"] = "application/json";

import "./assets/main.css";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.mount("#app");
