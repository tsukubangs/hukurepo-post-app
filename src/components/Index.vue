<template id="index">
  <v-ons-navigator :page-stack="pageStack">
    <component :is="page" v-for="page in pageStack" :page-stack="pageStack"></component>
  </v-ons-navigator>
</template>

<script>
import TopPage from './TopPage';

export default {
  name: 'index',
  data() {
    return {
      pageStack: [TopPage],
    };
  },
};
</script>
