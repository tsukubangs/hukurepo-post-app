<template>
  <div v-bind:class="{ unread: isUnSeen }" class="problem-card">
      <v-ons-icon icon="fa-exclamation-circle" class="unread-icon" size="32px" v-show="isUnSeen"></v-ons-icon>
      <photo-thumbnail :thumbnailUrl="thumbnailUrl" class="photo-thumbnail"></photo-thumbnail>
      <div class="content">
          <div class="comment">
              <p class="limit-comment" v-html="this.shortComment"></p>
          </div>
          <p class="translatestyle" v-html="TranslateshortComment">{{translate()}}</p>
          <div class="date">{{this.updatedTime}}</div>
          <!--<div id="output1">{{this.translate}}</div>-->
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import { WEB_API_URL, GOOGLE_TRANSLATE_API_KEY } from '../../.env';
import PhotoThumbnail from './PhotoThumbnail';
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
            question.append('q', this.problem.comment);
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
            if (sourceLang != this.isLanguage){
                // 翻訳APIをリクエスト
                const data = new FormData();
                data.append('q', this.problem.comment);
                data.append('source', sourceLang);
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
                this.comment = '';//this.problem.comment;
            }
        }
    }
}


export default {
  name: 'problem-card',
  components: {
    PhotoThumbnail,
  },
  props: [
    'problem',
    'useUnReadNotification',
    'isLanguage',
  ],
    data() {
        return {
            isTranslating: false,
            comment: '',
        };
    },
  computed: {
    thumbnailUrl() {
      return !this.problem.thumbnail_url ? null : WEB_API_URL + this.problem.thumbnail_url;
    },
    isUnSeen() {
      return this.useUnReadNotification && !this.problem.responses_seen;
    },
    shortComment() {
          const limitLength = 60;
          if (this.problem.comment.length <= limitLength) {
            return this.problem.comment;
          }
          return `${this.problem.comment.substr(0, limitLength - 1)}…`;
    },
    TranslateshortComment() {
        const limitLength = 60;
        if (this.comment.length <= limitLength) {
        return this.comment;
        }
        return `${this.comment.substr(0, limitLength - 1)}…`;
    },
    updatedTime() {
      return formatDateTime(this.problem.updated_at);
    },
  },
    methods: {
        translate,
    },
};
</script>

<style scoped>
.problem-card {
  position: relative;
  display: flex;
  background: rgba(1,168,236,0.1);
  border-radius: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 0 10px;
  text-align: left;
}
.comment {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 9;
  color: #7f7f7f;
}
.photo-thumbnail {
  width: 40%;
  border-radius: 20px;
  overflow: hidden;
}
.date {
  flex-grow: 1;
  text-align: right;
  font-size: x-small;
  color: #aaaaaa;
}
.cover {
  width: 100%;
  height: 100%;
}
p {
  padding: 0.5em 0;
  margin: 0;
  font-size: initial;
}
.unread {
  background: rgba(244,177,131,0.1);
}
.unread-icon {
  position: absolute;
  top: 3px;
  right: 3px;
  color: rgb(1, 168, 236);
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
