<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Sign up</div>
      <div class="right"><v-ons-toolbar-button modifier="outline" @click="toLogin">Log in</v-ons-toolbar-button></div>
    </v-ons-toolbar>
    <v-ons-list>
      <v-ons-list-header>
          Email
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="Email" v-ons-model="email" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.emailIsInputted && !validation.emailRequired">
        <div class="right">
          The email field is required
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.emailIsInputted && !validation.emailFormat">
        <div class="right">
          Invalid email address
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          Password
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="Password" type="password" v-ons-model="password" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.passwordIsInputted && !validation.passwordRequired">
        <div class="right">
          The password field is required
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-else-if="this.passwordIsInputted && !validation.passwordLength">
        <div class="right">
          Password length must be between 6 and 29
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
          Confirm Password
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input class="width100" placeholder="Confirm Password" type="password" v-ons-model="confirmPassword" float>
          </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item class="error-message" v-if="this.confirmPasswordIsInputted && !validation.confirmPasswordMatch">
        <div class="right">
          Password and Confirm Password don't match
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        Gender
      </v-ons-list-header>
      <v-ons-list-item v-for="(gender, $index) in genders" tappable>
        <label class="left">
          <v-ons-input type="radio" :input-id="'radio-' + $index" :value="gender" v-ons-model="selectedGender"></v-ons-input>
        </label>
        <label :for="'radio-' + $index" class="center">{{ gender }}</label>
      </v-ons-list-item>
      <v-ons-list-header>
        Age
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-ons-model="selectedAge">
            <option v-for="age in ages" :value="age.value">{{ age.key }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        Nationality
      </v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-select class="width100" v-ons-model="selectedNationality">
            <option v-for="Nationality in countries" :value="Nationality.name">{{ Nationality.name }}</option>
          </v-ons-select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <section style="margin: 16px">
      <v-ons-button modifier="large" v-bind:disabled="!this.signUpIsPermitted" @click="signUp()">Sign up</v-ons-button>
    </section>
  </v-ons-page>
</template>

<script>
import countries from '../assets/countries';
import ages from '../assets/ages';
import router from '../router';

const emailRegExp = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/;
const passwordMinLength = 6;
const passwordMaxLength = 29;

export default {
  name: 'sign-up',
  data() {
    return {
      selectedGender: 'male',
      genders: ['male', 'female'],
      countries,
      selectedNationality: 'Japan',
      ages,
      selectedAge: ages[2].value,
      email: '',
      password: '',
      confirmPassword: '',
      emailIsInputted: false,
      passwordIsInputted: false,
      confirmPasswordIsInputted: false,
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
             && this.validation.confirmPasswordMatch;
    },
  },
  methods: {
    toLogin() {
      router.push('login');
    },
    signUp() {
      console.log('sign up');
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
.select-input {
  color: #1f1f21;
}
.error-message {
  color: red;
  font-size: 13px;
}
</style>
