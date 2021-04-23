<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'event-list' }">List</router-link> |

      <router-link :to="{ name: 'event-create' }">Create</router-link> |
    </div>
    <router-view />
  </div>
</template>
