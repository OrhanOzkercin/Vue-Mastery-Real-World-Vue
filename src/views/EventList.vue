<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      v-if="page != 1"
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      >Prev Page</router-link
    >
    |
    <router-link
      v-if="eventsTotal > page * 3"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
export default {
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page || 1);
    },
    limit() {
      return parseInt(this.$route.query.limit || 1);
    },
    ...mapState(['events', 'eventsTotal']),
  },
};
</script>
