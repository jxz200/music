import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import permission from './directives'; // 注册自定义全局指令
import ElementPlus from 'element-plus';
import XButton from './components/XButton.vue';
import 'element-plus/dist/index.css';
import './assets/index.css';

createApp(App).directive('permission', permission).component('Button', XButton).use(ElementPlus).use(router).use(store).mount('#app');
//
