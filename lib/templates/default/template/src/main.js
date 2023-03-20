import { createApp } from 'vue'<% if (usePinia) { %>
import { createPinia } from 'pinia'<% } %><% if (useVuex) { %>
import store from '@/store'<% } %><% if (useRouter) { %>
import router from '@/router'<% } %>
import App from './App.vue'
const app = createApp(App)
// 全局挂载http封装的方法
// app.config.globalProperties.$http = http;
<% if (useRouter) { %>
app.use(router)<% } %><% if (usePinia) { %>
app.use(createPinia())<% } %><% if (useVuex) { %>
app.use(store)<% } %>
app.mount('#app')
