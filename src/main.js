import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

//GLOBAL CONSTANTS

app.config.globalProperties.$server_base_url =
  "https://faircorpmez.cleverapps.io/api/";

app.config.globalProperties.$GET = "GET";
app.config.globalProperties.$POST = "POST";
app.config.globalProperties.$PUT = "PUT";
app.config.globalProperties.$DELETE = "DELETE";

app.mount("#app");
