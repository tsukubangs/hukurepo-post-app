<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router';

export default {
  name: 'app',
  created() {
    const hasToken = window.localStorage.getItem('access_token');
    if (!hasToken) {
      router.push('Carousel');
    } else {
      router.push('/');
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
