import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import stores from './stores/index';
import VideoPlayer from 'vue-video-player';


require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';


const app = createApp(App);
app.use(router);  
app.use(ElementPlus);    
app.use(stores);
app.use(VideoPlayer);

app.mount('#app');