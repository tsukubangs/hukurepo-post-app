<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="right">
        <ons-toolbar-button modifier="outline" style="backgroundColor: white" @click="toAgree">
          Sign up
        </ons-toolbar-button>
      </div>
    </v-ons-toolbar>
     <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex" auto-scroll-ratio="0.1">
       <v-ons-carousel-item v-for="(value, key) in items" :style="{backgroundColor: value } " >
          <img id="image" src="../../res/instruction/1.png" v-if="value===1">
          <img id="image" src="../../res/instruction/2.png" v-if="value===2">
          <img id="image" src="../../res/instruction/5.png" v-if="value===3">
          <img id="image" src="../../res/instruction/3.png" v-if="value===4">
          <div v-if="value===5" class="adjust">
          <img id="image" src="../../res/instruction/4.png" v-if="value===5">
          <p><v-ons-button modifier="outline" @click="toAgree()">Sign up</v-ons-button></p>
          <p><v-ons-button modifier="quiet" @click="toLogin()">Already have an account</v-ons-button></p>
          </div>
       </v-ons-carousel-item>
     </v-ons-carousel>

     <div :style="dots">
       <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
         {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
       </span>
     </div>
   </v-ons-page>
</template>

<script>
import router from '../router';

export default {
  name: 'init-page',
  methods: {
    toLogin() {
      router.push('login');
    },
    toAgree() {
      router.push('agree');
    },
  },
  data() {
    return {
      carouselIndex: 0,
      items: {
        First: 1,
        Second: 2,
        Third: 3,
        Forth: 4,
        Fifth: 5,
      },
      dots: {
        textAlign: 'center',
        fontSize: '30px',
        color: '#01a8ec',
        position: 'absolute',
        bottom: '10px',
        left: 0,
        right: 0,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./../../config.scss";

main {
    height: 100%;
    display: flex;          /* 2 */
    justify-content: center;/* 3 */
    align-items: center;    /* 4 */
}

#image {
  width: 100%;
  max-width: 100%;
  margin-top: 10px;
}

.adjust{
  position: relative;
  height: 10px;
}

.background {
  background-color: $main-color;
}

.button--outline {
  background-color: white;
  // color: $main-color;
}

.button--quiet {
  color: gray;
  font-size: small;
}

#owl-words{
  color: #FFF;
  font-size: x-large;
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-top: 20px;
}

#owl-icon {
  width: 70%;
  max-width: 200px;
}

</style>
