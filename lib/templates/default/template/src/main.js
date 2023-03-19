import { createApp } from 'vue'<% if (store === 'pinia') { %>
import { createPinia } from 'pinia'<% } %><% if (store === 'vuex') { %>
import store from '@/store'<% } %><% if (hasRouter) { %>
import router from '@/router'<% } %><% if (useBulletin) { %>
import { addBiliBulletin } from '@bilibili/bulletin'<% } %>
import App from './App.vue'
<% if (useBulletin) { %>
// 针对不同环境使用不同的businessId
const businessId = 'xxx'
try {
  addBiliBulletin({ businessId })
} catch (err) {
  console.log(err)
}
<% } %>
const app = createApp(App)
// 全局挂载http封装的方法
// app.config.globalProperties.$http = http;
<% if (hasRouter) { %>
app.use(router)<% } %><% if (store === 'pinia') { %>
app.use(createPinia())<% } %><% if (store === 'vuex') { %>
app.use(store)<% } %>
app.mount('#app')
