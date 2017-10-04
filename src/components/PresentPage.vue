<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div class="">
      This is present page
    </div>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

export default {
  name: 'present-page',
  components: {
    CustomToolbar,
  },
};
</script>

<style scoped>
</style>
