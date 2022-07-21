import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";
import App from "./App.vue";
import "./assets/scss/index.scss";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store);
app.use(Notifications);
app.use(router);
app.mount("#app");

// createApp(App).use(router).mount("#app");
