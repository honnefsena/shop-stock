// src/main.js
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/main.css"

// Import common components
import Loader from "./components/common/Loader.vue"
import Error from "./components/common/Error.vue"
import ConfirmDialog from "./components/common/ConfirmDialog.vue"

const app = createApp(App)

// Register common components globally
app.component("Loader", Loader)
app.component("Error", Error)
app.component("ConfirmDialog", ConfirmDialog)

app.use(router)
app.use(store)
app.mount("#app")
