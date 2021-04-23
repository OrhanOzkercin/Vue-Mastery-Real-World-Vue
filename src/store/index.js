import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    eventsTotal: 0,
    user: { id: 'abc123', name: 'Orhan Özkerçin' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTSTOTAL(state, total) {
      state.eventsTotal = total;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event);
      commit('ADD_EVENT', event);
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((res) => {
          commit('SET_EVENTS', res.data);
          commit('SET_EVENTSTOTAL', res.headers['x-total-count']);
        })
        .catch((err) => console.error(err));
    },
  },
  modules: {},
  getters: {
    catLength: (state) => {
      return state.categories.length;
    },
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
  },
});
