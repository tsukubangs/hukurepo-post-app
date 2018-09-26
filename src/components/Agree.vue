<template>
  <v-ons-page>
<v-ons-toolbar>
<div class="left">
<ons-toolbar-button modifier="outline" style="backgroundColor: white" @click="changeLanguage">
{{ setLanguage }}
</ons-toolbar-button>
</div>
</v-ons-toolbar>
    <div id="agreement" class="blueOutline">
      <h1>{{ Agreement.title }}</h1>
      <p>{{ Agreement.one }}<br></p>
      <p>{{ Agreement.two }}<br></p>

        <v-ons-checkbox
            :value="0"
            v-model="checkOn"
          >
          </v-ons-checkbox>
          <b>{{ Agreement.sign }}</b>

          <div id="button">
            <ons-button style="margin-right: 10%;" modifier="light" @click="toCarousel()">N O</ons-button>
            <ons-button input-id="nextButton" :disabled="!checkOn" modifier="cta" @click="toSignUp()">YES</ons-button>
          </div>
  </div>

  </v-ons-page>
</template>

<script>
import router from '../router';
import CustomToolbar from './CustomToolbar';

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

export default {
  name: 'agree-page',
  components: {
    CustomToolbar,
  },
  computed:{
    setLanguage: function(){
      return this.language.labelLang;
    },
    Agreement: function(){
      const message = getMessages(this.language.lang);
      return message.agreement;
    },
  },
  data() {
    return {
      language:this.initialLanguage(),
      checkOn: false,
    };
  },
  methods: {
    toSignUp() {
      router.push('sign-up');
    },
    toCarousel() {
      router.push('carousel');
    },
    changeLanguage(){
      const lang = window.localStorage.getItem('deviceLanguage');
      if (lang == 'en'){
        window.localStorage.setItem('deviceLanguage', 'ja');
        this.language = {labelLang:'日本語', lang:'ja'};
      }
      else if(lang == 'ja'){
        window.localStorage.setItem('deviceLanguage', 'ko');
        this.language = {labelLang:'한국', lang:'ko'};
      }
      else if(lang == 'ko'){
        window.localStorage.setItem('deviceLanguage', 'zh');
        this.language = {labelLang:'中国', lang:'zh'};
      }
      else if(lang == 'zh'){
        window.localStorage.setItem('deviceLanguage', 'en');
        this.language = {labelLang:'English', lang:'en'};
      }
    },
    initialLanguage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      if (lang == 'ja'){
        return {labelLang:'日本語', lang:'ja'};
      }
      else if(lang == 'ko'){
        return {labelLang:'한국', lang:'ko'};
      }
      else if(lang == 'zh'){
        return {labelLang:'中国', lang:'zh'};
      }
      else if(lang == 'en'){
        return {labelLang:'English', lang:'en'};
      }
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
