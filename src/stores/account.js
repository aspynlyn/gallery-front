import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useAccoundStore = defineStore('accont', () => {
  const state = reactive({
    checked: false,
    loggedIn: false,
  });
  const setChecked = (val) => (state.checked = val);

  const steLoggedIn = (val) => (state.loggedIn = val);

  return { state, setChecked, steLoggedIn };
});
