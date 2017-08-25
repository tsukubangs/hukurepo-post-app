<template>
  <v-ons-page>
    <div class="background"></div>
    <div id="owl-words">
      <p style="margin-top: 100px">
        Welcome to Tsukuba. If you have any problems, let us know! We can help you!
      </p>
      <img src="../../res/tsukurepo-icon.png" width="200" height="200" alt="owl">
    </div>
    <div id="signup-or-login">
      <p style="margin-top: 30px;">
        <ons-button modifier="outline" @click="toAgree()">Sign Up</ons-button>
      </p>
      <p><ons-button modifier="quiet" @click="toLogin()">Already have an account</ons-button></p>
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
};
</script>

<style scoped>
#signup-or-login {
  background-color: transparent;
  width: 300px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#owl-words{
  color: #FFF;
  font-size: x-large;
  width: 300px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background {
  background-color: #01a8ec;
}

.button--outline {
  background-color: white;
  color: #01a8ec;
}

.button--quiet {
  color: white;
}
</style>
