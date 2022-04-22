import { createApp } from 'vue';
import App from './App.vue';

// router
import router from './routes';

// stores 
import stores from './stores';

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';


const app = createApp(App);


app.use(router);
app.use(stores);    
app.use(ElementPlus);    


app.mount('#app');