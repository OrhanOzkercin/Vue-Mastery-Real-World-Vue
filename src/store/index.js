import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {},
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
    SET_EVENT(state, event) {
      state.event = event;
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
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
      if (event) {
        commit('SET_EVENT', event);
      } else {
        EventService.getEvent(id).then((res) => commit('SET_EVENT', res.data));
      }
    },
  },
  modules: {},
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
});
