<template>
    <div class="frame">
        <v-ons-icon icon="ion-ios-camera-outline" size="200px" style="margin: -20px 0;" class="style">
        </v-ons-icon>
        <p>{{ this.messages.icon }}</p>
    </div>
</template>

<script>
export default {
  name: 'camera-button',
  data() {
    return {
      messages: this.getMessages(),
    };
  },
  methods:{
    getMessages(){
      const messages = window.localStorage.getItem('messages');
      return JSON.parse(messages).CameraButton;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../config.scss";

.frame {
  border:solid 1px rgba(127, 127, 127, 0.5);
  padding:0 20px;
  border-radius:60px;
  display:inline-block;
}

.style{
  color: $main-color;
}

p {
  margin: 0 0 10px 0;
  font-size: 25px;
  color: #7f7f7f;
}
</style>
