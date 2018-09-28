<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button class="white-btn" modifier="outline" @click="changeLanguage">
            {{ setLanguage }}
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ labels.title }}</div>
      <div class="right">
        <v-ons-toolbar-button class="white-btn" modifier="outline" @click="toLogin">
            {{ labels.login }}
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <ons-progress-bar indeterminate  v-show="this.signUpPosting === true"></ons-progress-bar>
    <v-ons-list>
      <v-ons-list-header>
        {{ labels.Email }}
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" v-bind:placeholder="this.placeholders.Email" v-model="email" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.emailIsInputted && !validation.emailRequired">
        <div class="right">
          {{ labels.error.emailEmpty }}
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.emailIsInputted && !validation.emailFormat">
        <div class="right">
          {{ labels.error.emailFormat }}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          {{ labels.Password }}
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" v-bind:placeholder="this.placeholders.Password" type="password" v-model="password" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.passwordIsInputted && !validation.passwordRequired">
        <div class="right">
          {{ labels.error.passwordEmpty }}
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.passwordIsInputted && !validation.passwordLength">
        <div class="right">
          {{ labels.error.passwordFormat }}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          {{ labels.ConfirmPassword }}
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" v-bind:placeholder="this.placeholders.ConfirmPassword" type="password" v-model="confirmPassword" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.confirmPasswordIsInputted && !validation.confirmPasswordMatch">
        <div class="right">
          {{ labels.error.confirm }}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          {{ labels.Gender }}
      </v-ons-list-header>
      <v-ons-list-item v-for="(gender, $index) in genders" tappable>
        <label class="left">
          <v-ons-radio :input-id="'radio-' + $index" :value="gender" v-model="selectedGender"></v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">{{ gender }}</label>
      </v-ons-list-item>
      <v-ons-list-header>
          {{ labels.Age }}
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-model="selectedAge">
            <option v-for="age in ages" :value="age">{{ age.slice(1) }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          {{ labels.Country }}
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-model="selectedCountryOfResidence">
            <option v-for="Country in countries" :value="Country.name">{{ Country.name }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <section style="margin: 16px">
    <v-ons-button modifier="large" v-bind:disabled="!this.signUpIsPermitted" @click="confirmDialogVisible = true">
        {{ labels.Confirm }}
    </v-ons-button>
    </section>
    <v-ons-alert-dialog modifier="rowfooter" v-bind:title="this.SignUpMessage" :visible.sync="confirmDialogVisible">
      {{ labels.Email }}: {{this.email}}<br />
      {{ labels.Gender }}: {{this.selectedGender}}<br />
      {{ labels.Age }}: {{this.selectedAge.slice(1)}}<br />
      {{ labels.Country }}: {{this.selectedCountryOfResidence}}

      <template slot="footer">
        <button class="alert-dialog-button" @click="confirmDialogVisible = false">{{ labels.Edit }}</button>
        <button class="alert-dialog-button" @click="postSignUp">{{ labels.SignUp }}</button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import countries from '../assets/countries';
import ages from '../assets/ages';
import router from '../router';
import { WEB_API_URL } from '../../.env';
import { USER_ROLE } from '../constants';

const emailRegExp = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/;
const passwordMinLength = 6;
const passwordMaxLength = 29;

function getMessages(lang){
  const messages = require('../assets/message.json');
  switch (lang){
    case 'ja':
      return messages.ja;
    case 'ko':
      return messages.ko;
    case 'zh':
      return messages.zh;
    default:
      return messages.en;
  }
}

function postSignUp() {
  const data = {
    email: this.email,
    password: this.password,
    gender: this.selectedGender,
    country_of_residence: this.selectedCountryOfResidence,
    age: this.selectedAge.split('-')[0].slice(1),
    role: USER_ROLE,
  };
  this.confirmDialogVisible = false;
  this.signUpPosting = true;
  axios.post(`${WEB_API_URL}/v1/users`, data)
        .then((response) => {
          window.localStorage.setItem('access_token', response.data.access_token);
          this.signUpPosting = false;
          ons.notification.alert({
            title: '',
            message: this.labels.info.complete,
            callback: () => {
              router.push('/');
            },
          });
        }).catch((error) => {
          let title;
          let message;
          if (!error.response) {
            title = this.labels.error.ConnectErrorTitle;
            message = this.labels.error.ConnectErrorBody;
          } else if (error.response.status === 422) {
            title = this.labels.error.EmailErrorTitle;
            message = this.labels.error.EmailErrorBody;
          }
          ons.notification.alert({
            title,
            message,
          });
          this.signUpPosting = false;
        });
}

export default {
  name: 'sign-up',
  data() {
    return {
      selectedGender: this.initialSelectedGender(),
      genders: this.initialGenders(),
      countries,
      selectedCountryOfResidence: 'Japan',
      ages,
      selectedAge: 'a20-29',
      email: '',
      password: '',
      confirmPassword: '',
      emailIsInputted: false,
      passwordIsInputted: false,
      confirmPasswordIsInputted: false,
      confirmDialogVisible: false,
      signUpPosting: false,
      language: this.initialLanguage(),
      placeholders: this.initialPlaceHolders(),
      SignUpMessage: this.initialSignUpMessage(),
    };
  },
  computed: {
    validation() {
      return {
        emailRequired: this.email !== '',
        emailFormat: emailRegExp.test(this.email),
        passwordRequired: this.password !== '',
        passwordLength: passwordMinLength <= this.password.length
                        && this.password.length <= passwordMaxLength,
        confirmPasswordMatch: this.confirmPassword === this.password,
      };
    },
    signUpIsPermitted() {
      return this.validation.emailRequired && this.validation.emailFormat
             && this.validation.passwordRequired && this.validation.passwordLength
             && this.validation.confirmPasswordMatch && !this.signUpPosting;
    },
    labels(){
      const message = getMessages(this.language.lang);
      window.localStorage.setItem('messages',JSON.stringify(message));
      return message.signUp;
    },
    setLanguage: function(){
      return this.language.labelLang;
    },
  },
  methods: {
    toLogin() {
      router.push('login');
    },
    postSignUp,
    changeLanguage(){
      var lang = window.localStorage.getItem('deviceLanguage');
      if (lang == 'en'){
        window.localStorage.setItem('deviceLanguage', 'ja');
        lang = 'ja';
      }
      else if(lang == 'ja'){
        window.localStorage.setItem('deviceLanguage', 'ko');
        lang = 'ko';
      }
      else if(lang == 'ko'){
        window.localStorage.setItem('deviceLanguage', 'zh');
        lang = 'zh';
      }
      else if(lang == 'zh'){
        window.localStorage.setItem('deviceLanguage', 'en');
        lang = 'en';
      }
      var labels = getMessages(lang);
      this.language = {labelLang:labels.labelLang, lang:lang};
      const tmpGenders = this.genders;
      this.genders = labels.signUp.genders;
      if (this.selectedGender == tmpGenders[0]){
        this.selectedGender = labels.signUp.genders[0];
      }
      else{
        this.selectedGender = labels.signUp.genders[1];
      }
      this.SignUpMessage = labels.signUp.SignUpMessage;
      this.placeholders = labels.signUp.placeholders;
    },
    initialLanguage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return {labelLang:labels.labelLang, lang:lang};
    },
    initialGenders(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.signUp.genders;
    },
    initialSelectedGender(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.signUp.genders[0];
    },
    initialPlaceHolders(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.signUp.placeholders;
    },
    initialSignUpMessage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.signUp.SignUpMessage;
    },
  },
  created() {
    this.$watch('email', () => {
      if (!this.emailIsInputted) {
        this.emailIsInputted = true;
      }
    });
    this.$watch('password', () => {
      if (!this.passwordIsInputted) {
        this.passwordIsInputted = true;
      }
    });
    this.$watch('confirmPassword', () => {
      if (!this.confirmPasswordIsInputted) {
        this.confirmPasswordIsInputted = true;
      }
    });
  },
};
</script>

<style>
.width100 {
  width: 100%;
}
.text-input__container > input {
  width: 100%;
}
.select-input {
  color: #1f1f21;
}
.error-message {
  color: red;
  font-size: 13px;
}
.white-btn {
  color: #fff;
  border-color: #fff;
}
</style>
