import { createStore } from "vuex";
import { weather } from '@/store/modules/weather';
export default createStore({
  modules: {
    weather: weather,
  },
});
