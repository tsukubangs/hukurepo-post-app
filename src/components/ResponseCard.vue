<template>
  <div v-bind:class="{ reverce: !isMyResponse }" class="response-card">
    <div class="icon-container">
      <div class="tsukuba-icon right-justified" v-bind:style="{'background-color': this.getBackGroundColor}" v-if="!isMyResponse">
        <img src="../assets/s_logo.png" />
      </div>
      <img src="../assets/response_icon.png" v-else />
    </div>
    <div class="content">
      <p class="break-word" v-html="activateLinkComment"></p>
      <p class="translatestyle" v-html="translateactivateLinkComment">{{translate()}}</p>
      <p class="date">{{ this.updatedTime }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import { WEB_API_URL, GOOGLE_TRANSLATE_API_KEY } from '../../.env';
import autolinker from 'autolinker';
import formatDateTime from '../function/formatDateTime';


async function translate() {
    if(this.isLanguage!='')
    {
        if(this.isLanguage == 'original')
        {
            this.comment='';
        }
        else
        {
            // 質問文の言語判定
            var sourceLang;
            const question = new FormData();
            question.append('q', this.response.comment);
            question.append('key', GOOGLE_TRANSLATE_API_KEY);
            await axios.post('https://translation.googleapis.com/language/translate/v2/detect', question)
                .then((response) => {
                    const targetLanguage = response.data.data.detections[0][0].language;
                    sourceLang = targetLanguage;
                }).catch((error) => {
                    console.log(error);
                    /*ons.notification.alert({
                        title: '翻訳後の言語取得に失敗しました。',
                        message: '回答文は英語で翻訳されます。',
                    });*/
                });
            //if (sourceLang != this.targetLang){
            if (sourceLang != this.isLanguage){
                // 翻訳APIをリクエスト
                const data = new FormData();
                data.append('q', this.response.comment);
                data.append('source', sourceLang);
                //data.append('target', this.targetLang);
                data.append('target', this.isLanguage);
                data.append('format', 'text');
                data.append('key', GOOGLE_TRANSLATE_API_KEY);
                axios.post('https://translation.googleapis.com/language/translate/v2', data)
                    .then((response) => {
                        //console.log('翻訳後:${response.data.data.translations[0].translatedText}');
                        this.comment = response.data.data.translations[0].translatedText;
                    }).catch((error) => {
                        console.log(error);
                        /*ons.notification.alert({
                            title: '',
                            message: '翻訳に失敗しました',
                        });*/
                    });
            }
            else{
                // 質問が日本語の場合は翻訳しない
                this.comment = '';//this.response.comment;
            }
        }
    }
}

export default {
  name: 'response-card',
  props: [
    'response',
    'isMyResponse',
    'isLanguage',
  ],
    data() {
        return {
            comment: '',
            targetLang: '',
        };
    },
  computed: {
    updatedTime() {
      return formatDateTime(this.response.updated_at);
    },
    activateLinkComment() {
          return autolinker.link(this.response.comment, { truncate: { length: 32, location: 'smart' } });
    },
    translateactivateLinkComment() {
        return autolinker.link(this.comment, { truncate: { length: 32, location: 'smart' } });
    },
    getBackGroundColor() {
      const patternNum = 20;
      const hue = (this.response.user_id % patternNum) * (360 / patternNum) * 3;
      return `hsl(${hue}, 50%, 50%)`;
    },
  },
    methods: {
        translate,
    },
};
</script>

<style lang="scss" scoped>
@import "./../../config.scss";
.response-card {
  position: relative;
  display: flex;
  flex-direction: row;
}
.reverce {
  flex-direction: row-reverse;
}
.icon-container {
  padding-top: 5px;
  width: 60px;
}
.icon-container > * {
  height: 50px;
  width: 50px;
}
.tsukuba-icon {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-justified {
  margin-left: auto;
}
.tsukuba-icon > img {
  display: inline-block;
  height: unset;
  width: 30px;
}
.content {
  width: 220px;
  color: #7f7f7f;
}
.comment {
  margin-top: 5px;
}
.date {
  font-size: x-small;
  color: #aaaaaa;
}
.break-word {
  word-wrap: break-word;
}
.translatestyle {
//background-color: #FFF;
color: #2bb46e;
padding-left: 10px;
padding-right: 10px;
margin-right: 15px;
/*margin: auto 8px;*/
border-radius: 15px;
}
</style>
