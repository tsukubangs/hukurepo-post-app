<template>
  <v-ons-page>
    <div id="agreement">
      <p style="margin-top: 100px">
        This application is  research entitled “Problem finding and solving for foreign visitors using a smartphone application,” which includes the summary and methods of study, necessity of human subjects’ participation, possible risks and safety issues associated with participation in the study, measures to prevent anticipated harm, and protection of personal information?along with a video recording.
I understand that I will not be penalized in any way if I do not consent to participate in the study, and I am free to withdraw my consent at any time without any penalty. I also understand that I am free to withdraw my consent for any data that I provide for use in this study at any time before the date specified below, even after completion of the study and experiments (if applicable). I agree to participate in the research study with the above understanding.
<br><br>
      Do you agree to the above consent form?</p>
  </div>
    <div id="button">
      <p style="margin:20px 20px 20px 20px"><ons-button modifier="light" @click="toInit()">N O</ons-button>
      <ons-button modifier="cta" @click="toSignUp()">YES</ons-button></p>
    </div>

  </v-ons-page>
</template>

<script>
import router from '../router';

export default {
  name: 'agree-page',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    toSignUp() {
      router.push('sign-up');
    },
    toInit() {
      router.push('init');
    },
  },
};
</script>

<style scoped>

#button {
text-align:center;
margin: 10px;
}

ons-dialog:not([modifier='material']) p {
  margin-left: 10px;
  margin-right: 10px;
}

input {
  width: 100%;
}

div.button {
text-align:center;
}
div.button input {
margin: 0px 20px;
}

.button--outline {
  background-color: white;
  color: #01a8ec;
}
</style>
