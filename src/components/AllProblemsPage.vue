<template>
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> {{ this.messages.initial }} </span>
      <span v-show="state === 'preaction'"> {{ this.messages.preaction }} </span>
      <span v-show="state === 'action'"> {{ this.messages.action }} </span>
    </v-ons-pull-hook>

<v-ons-toolbar>
<div class="center" v-if="this.language.lang=='ja'">みんなの投稿</div>
<div class="center" v-if="this.language.lang=='ko'">모두의 게시물</div>
<div class="center" v-if="this.language.lang=='zh'">每个人的帖子</div>
<div class="center" v-if="this.language.lang=='en'">Timeline</div>

<div class="right" v-if="this.language.lang=='ja'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>翻訳</option>
<option value="original">元言語</option>
<option value="en">英語</option>
<option value="ja">日本語</option>
<option value="zh">中国語</option>
<option value="ko">韓国語</option>
</select>
</div>

<div class="right" v-if="this.language.lang=='ko'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>번역</option>
<option value="original">원래 언어</option>
<option value="en">영어</option>
<option value="ja">일본어</option>
<option value="zh">중국</option>
<option value="ko">한국</option>
</select>
</div>

<div class="right" v-if="this.language.lang=='zh'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>翻訳</option>
<option value="original">源语言</option>
<option value="en">英语</option>
<option value="ja">日本</option>
<option value="zh">中国</option>
<option value="ko">朝鲜的</option>
</select>
</div>


<div class="right" v-if="this.language.lang=='en'">
<select class="select" v-model="targetLang">
<option value="" disabled selected>Translate</option>
<option value="original">Original</option>
<option value="en">English</option>
<option value="ja">Japanese</option>
<option value="zh">Chinese</option>
<option value="ko">Korean</option>
</select>
</div>

</v-ons-toolbar>

    <main class="h100">
      <ul class="card-list">
        <li v-for="problem in allProblems.data" @click="toResponse(problem)">
          <problem-card v-show="chkHidden(problem)" :problem="problem" :useUnReadNotification="false" :isLanguage="targetLang" class="w100"></problem-card>
        </li>
      </ul>
      <v-ons-progress-circular indeterminate v-show="allProblems.loading"></v-ons-progress-circular>
    </main>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProblemCard from './ProblemCard';
import ResponsePage from './ResponsePage';
import { FETCH_ALL_PROBLEMS, REFETCH_ALL_PROBLEMS, SELECT_PROBLEM } from '../vuex/mutation-types';

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
  name: 'all-problems-page',
  components: {
    ProblemCard,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_ALL_PROBLEMS({ page: 1 });
  },
  data() {
    return {
      state: 'initial',
      messages: this.getMessages(),
      language: this.initialLanguage(),
      targetLang: '',
    };
  },
  computed: {
    ...mapGetters([
      'allProblems',
    ]),
  },
  methods: {
    ...mapActions([
      FETCH_ALL_PROBLEMS,
      REFETCH_ALL_PROBLEMS,
      SELECT_PROBLEM,
    ]),
    toResponse(problem) {
      this.SELECT_PROBLEM(problem);
      this.pageStack.push(ResponsePage);
    },
    loadItem(done) {
      setTimeout(() => {
        this.REFETCH_ALL_PROBLEMS();
        done();
      }, 400);
    },
    loadMore(done) {
      if (!this.allProblems.loading && !this.allProblems.isFinished) {
        this.FETCH_ALL_PROBLEMS({ callback: done });
      } else {
        done();
      }
    },
    getMessages(){
      const messages = window.localStorage.getItem('messages');
      return JSON.parse(messages).AllProblems;
    },
    initialLanguage(){
        if(window.localStorage.getItem('deviceLanguage') == null){
            window.localStorage.setItem('deviceLanguage', 'en');
        }
        const lang = window.localStorage.getItem('deviceLanguage');
        var labels = getMessages(lang);
        return {labelLang:labels.labelLang, lang:lang};
    },
    chkHidden(problem){
        var hiddenUsers = window.localStorage.getItem('hiddenUsers');
        var hiddenDatas = window.localStorage.getItem('hiddenDatas');
        if (hiddenUsers != "" && hiddenUsers != null){
            var hiddenUserAry = hiddenUsers.split(',');
            if (hiddenUserAry.indexOf(String(problem.user_id)) != -1) return false;
        }
        if (hiddenDatas != "" && hiddenDatas != null){
            var hiddenDataAry = hiddenDatas.split(',');
            if (hiddenDataAry.indexOf(String(problem.id)) != -1) return false;
        }
        return true;
    }
  },
};
</script>

<style scoped>
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
}
.card-list > li {
  margin: 10px 0;
}
.w100 {
  width: 100%;
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
