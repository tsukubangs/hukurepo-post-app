<template>
  <div v-if="isError">
    can't get your position.
  </div>
  <div class="centering" v-else-if="!hasLatlng">
    <v-ons-icon icon="md-spinner" size="30px" spin></v-ons-icon>
  </div>
  <gmap-map :center="position" :zoom="17" v-else>
    <gmap-marker v-for="m in markers" :position="m.position" :clickable="false" :draggable="false"></gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  name: 'google-map',
  props: [
    'latitude',
    'longitude',
    'isError',
  ],
  computed: {
    position() {
      return { lat: Number(this.latitude), lng: Number(this.longitude) };
    },
    markers() {
      return [{ position: { lat: Number(this.latitude), lng: Number(this.longitude) } }];
    },
    hasLatlng() {
      return this.latitude !== '' && this.longitude !== '';
    },
  },
};
</script>

<style scoped >
  .centering {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
