import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/nora';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const app = createApp(App)
import '@/assets/styles/index.scss';
import '@/assets/styles/cropper/index.css';
import '@/assets/styles/cropper/theme.scss';
import '@/assets/fonts/fontawesome/css/all.css';

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: 'p',
      darkModeSelector: '.my-app-dark',
      cssLayer: false
    }
  }
});
app.component('InputText', InputText);
// eslint-disable-next-line vue/multi-word-component-names,vue/no-reserved-component-names
app.component('Button', Button);

app.mount('#app')
