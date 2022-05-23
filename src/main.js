import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import stores from './stores/index';
import VideoPlayer from 'vue-video-player';

// axios restful 호출
import axios from 'axios';

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

// element plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue';


const app = createApp(App);
app.use(router);  
app.use(ElementPlus);    
app.use(stores);
app.use(VideoPlayer);
app.config.globalProperties.axios = axios;
app.use(CKEditor);

app.mount('#app');