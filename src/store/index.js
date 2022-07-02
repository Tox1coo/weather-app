import { createStore } from "vuex";
import { dbCountry } from '@/store/modules/dbCountry';
import { weather } from '@/store/modules/weather';

export default createStore({
  modules: {
    dbCountry: dbCountry,
    weather: weather,
  },
});
