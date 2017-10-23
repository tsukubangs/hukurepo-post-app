<template>
  <v-ons-page>
    <div id="agreement" class="blueOutline">
      <h1>Agreement</h1>
        <p>This application is a research entitled “Problem finding and solving for foreign visitors using a smartphone application,” which includes the summary and methods of study, necessity of human subjects’ participation, possible risks and safety issues associated with participation in the study, measures to prevent anticipated harm, and protection of personal information?along with a video recording.<br></p>

        <p>I understand that I will not be penalized in any way if I do not consent to participate in the study, and I am free to withdraw my consent at any time without any penalty. I also understand that I am free to withdraw my consent for any data that I provide for use in this study at any time before the date specified below, even after completion of the study and experiments (if applicable). <br></p>

        <v-ons-checkbox
            :value="0"
            v-model="checkOn"
          >
          </v-ons-checkbox>
          <b>I agree to participate in the research study with the above understanding.</b>

          <div id="button">
            <ons-button style="margin-right: 10%;" modifier="light" @click="toInit()">N O</ons-button>
            <ons-button input-id="nextButton" :disabled="!checkOn" modifier="cta" @click="toSignUp()">YES</ons-button>
          </div>
  </div>

  </v-ons-page>
</template>

<script>
import router from '../router';
import CustomToolbar from './CustomToolbar';

export default {
  name: 'agree-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      checkOn: false,
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

<style lang="scss" scoped>
@import "./../../config.scss";

#button {
text-align:center;
margin: 10px;
}

#agreement {
  margin: 5%;
  padding: 5%;
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
  color: $main-color;
}

.blueOutline {
  /*color: #01a8ec;*/
  border: solid 1px $main-color;
}

</style>
