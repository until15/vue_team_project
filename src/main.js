import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import stores from './stores/index';

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';


const app = createApp(App);
app.use(router);  
app.use(ElementPlus);    
app.use(stores);

app.mount('#app');