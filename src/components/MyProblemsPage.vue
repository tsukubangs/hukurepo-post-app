<template>
  <v-ons-page>
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> {{ this.messages.initial }} </span>
      <span v-show="state === 'preaction'"> {{ this.messages.preaction }} </span>
      <span v-show="state === 'action'"> {{ this.messages.action }} </span>
    </v-ons-pull-hook>

<v-ons-toolbar>
<div class="center" v-if="this.language.lang=='ja'">あなたのページ</div>
<div class="center" v-else-if="this.language.lang=='ko'">내 페이지</div>
<div class="center" v-else-if="this.language.lang=='zh'">你的页面</div>
<div class="center" v-else>My Page</div>

<div class="right" v-if="this.language.lang=='ja'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>言語</option>
<option value="original">元言語</option>
<option value="en">英語</option>
<option value="ja">日本語</option>
<option value="zh">中国語</option>
<option value="ko">韓国語</option>
</select>
</div>

<div class="right" v-else-if="this.language.lang=='ko'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>언어</option>
<option value="original">원래 언어</option>
<option value="en">영어</option>
<option value="ja">일본어</option>
<option value="zh">중국</option>
<option value="ko">한국</option>
</select>
</div>

<div class="right" v-else-if="this.language.lang=='zh'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>语言</option>
<option value="original">源语言</option>
<option value="en">英语</option>
<option value="ja">日本</option>
<option value="zh">中国</option>
<option value="ko">朝鲜的</option>
</select>
</div>


<div class="right" v-else>
<select class="select" v-model="targetLang">
<option value="" disabled selected>Language</option>
<option value="original">Original</option>
<option value="en">English</option>
<option value="ja">Japanese</option>
<option value="zh">Chinese</option>
<option value="ko">Korean</option>
</select>
</div>
</v-ons-toolbar>

    <a href="https://bigclout-api.kde.cs.tsukuba.ac.jp/event/"><img :src="getImage" alt="BANNER"  width="100%" border="0"></a>
    <main class="h100">
      <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
        <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
      </div>
      <ul class="card-list">
        <!--<li v-for="problem in problems" @click="toResponse(problem)">
          <problem-card :problem="problem" :useUnReadNotification="true" class="w100"></problem-card>
        </li>-->
        <li v-for="(problem, index) in problems">
            <div @click="toResponse(problem)">
            <problem-card :problem="problem" :useUnReadNotification="true" :isLanguage="targetLang" class="w100"></problem-card>
            </div>
        </li>
      </ul>
    </main>
    <v-ons-fab position="bottom right" id="postButton" class="style":visible="fetchProblemsStatus.isCompleted" @click="push"><v-ons-icon icon="md-edit"></v-ons-icon></v-ons-fab>
    <v-ons-popover cancelable :visible="popoverVisible" :target="target" direction="up" :cover-target="false">
        <p style="text-align: center">{{ this.messages.leadSentence }}</p>
    </v-ons-popover>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import ProblemCard from './ProblemCard';
import CameraPage from './CameraPage';
import ResponsePage from './ResponsePage';
import { FETCH_PROBLEMS, REFETCH_PROBLEMS, SELECT_PROBLEM, SAW_RESPONSES_OF_PROBLEM } from '../vuex/mutation-types';
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
  name: 'my-problems-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
  created() {
    this.$store.watch(state => state.fetchProblemsStatus.isError, (isError) => {
      if (isError) {
        ons.notification.alert({
          title: this.messages.error.connectTitle,
          message: this.messages.error.connectBody,
          callback: this.FETCH_PROBLEMS,
        });
      }
    });

    this.FETCH_PROBLEMS();
  },
  data() {
    return {
      state: 'initial',
      target: '#postButton',
      messages: this.getMessages(),
      language: this.initialLanguage(),
      targetLang: '',
    };
  },
  computed: {
    ...mapGetters([
      'problems',
      'fetchProblemsStatus',
    ]),
    popoverVisible() {
      return this.problems.length === 0 && this.fetchProblemsStatus.isCompleted;
    },
    getImage(){
        switch (this.language.lang){
            case 'ja':
                return require('./../assets/jbanner.png');
            case 'ko':
                return require('./../assets/kbanner.png');
            case 'zh':
                return require('./../assets/cbanner.png');
            default:
                return require('./../assets/banner.png');
        }
    },
  },
  methods: {
    ...mapActions([
      FETCH_PROBLEMS,
      REFETCH_PROBLEMS,
      SELECT_PROBLEM,
      SAW_RESPONSES_OF_PROBLEM,
    ]),
    push() {
      this.pageStack.push(CameraPage);
    },
    toResponse(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ResponsePage);
      if (!problem.responses_seen) {
        this.SAW_RESPONSES_OF_PROBLEM(problem);
      }
    },
    loadItem(done) {
      setTimeout(() => {
        this.REFETCH_PROBLEMS();
        done();
      }, 400);
    },
    getMessages(){
      const messages = window.localStorage.getItem('messages');
      return JSON.parse(messages).MyProblems;
    },
    initialLanguage(){
        if(window.localStorage.getItem('deviceLanguage') == null){
            window.localStorage.setItem('deviceLanguage', 'en');
        }
        const lang = window.localStorage.getItem('deviceLanguage');
        var labels = getMessages(lang);
        return {labelLang:labels.labelLang, lang:lang};
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../config.scss";

.h100 {
  height:100%;
}
main {
  padding: 5px;
  box-sizing: border-box;
}
.centering {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-bottom: 100px;
}
.card-list > li {
  margin: 10px 0;
}
.w100 {
  width: 100%;
}

.style {
  color: #FFF;
  background-color: $main-color;
}
.select1 {
    background-color: #3498DB;
}
.select {
background-color: #FFF;
color: #2bb46e;
padding-left: 10px;
padding-right: 10px;
margin-right: 15px;
/*margin: auto 8px;*/
border-radius: 15px;
}

</style>
