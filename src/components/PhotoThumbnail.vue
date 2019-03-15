<template>
  <div class="thumbnail">
    <img :src="thumbnailUrl" v-if="!!thumbnailUrl" />
    <img src="../assets/noimage.jpg" v-else />
  </div>
</template>

<script>
export default {
  name: 'photo-thumbnail',
  props: [
    'thumbnailUrl',
  ],
};
</script>

<style scoped>
.thumbnail {
  position: relative;
}
.thumbnail:before {
    content: "";
    display: block;
    padding-top: 100%;
}
.thumbnail > img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
}
img {
  width: 100%;
  object-fit: cover;
}
</style>
