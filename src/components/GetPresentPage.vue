<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div class="box">
      <p class="campaign-title">
        "Hukurepo Present Campaign"
      </p>
      <img id="thanks-img" src="../assets/thanks.png" alt="thanks">
      <div class="">
        <p class='note-title'>Notes</p>
        <p class="note-detail">
          ・Please show this screen to Tsukuba City staff.</br>
          ・Please do not touch the button. (Tsukuba staff will use it)</p>

      </div>
      <div class="">
        <v-ons-button v-if="!isPresentReceived"
                    @click="checkPass()"
                    modifier="large"
                    style="margin: 6px 0">
                    交換する
        </v-ons-button>
        <v-ons-button v-else disabled modifier="large" style="margin: 6px 0">You already got a present.</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import { PRESENT_PASSWORD } from '../../.env';

export default {
  name: 'get-present',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      isPresentReceived: false,
      password: '',
    };
  },
  created() {
    this.isPresentReceived = window.localStorage.getItem('got_present');
  },
  methods: {
    checkPass() {
      ons.notification.prompt({
        inputType: 'number',
        title: 'パスワードを入力してください',
        message: 'Input Password.',
      })
        .then((response) => {
          if (response === PRESENT_PASSWORD) {
            window.localStorage.setItem('got_present', true);
            this.isPresentReceived = window.localStorage.getItem('got_present');
            ons.notification.alert({
              title: '',
              message: 'プレゼントを渡してください',
            });
          } else {
            ons.notification.alert({
              title: 'パスワードが違います',
              message: 'incorrect password',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: auto;
}
.campaign-title {
  font-size: 18px;
  font-weight: 500;
  margin-top:20px;
  margin-bottom: 0px;
}
.note-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  text-align: left;
}
.note-detail {
  font-size: 12px;
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 30px;
  text-align: left;
}
#thanks-img {
  width: 200px;
  margin-top: 20px;
}
</style>
