<template id="camera-page">
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <ons-progress-bar indeterminate  v-show="this.isPosting === true"></ons-progress-bar>
    <ons-progress-bar indeterminate  v-show="this.isPosting === true"></ons-progress-bar>
    <textarea id="text-form" class="textarea" rows="5" v-bind:placeholder="this.messages.placeholders.postComment" v-model="postComment" name='description' v-focus v-resize></textarea>
    <div @click="takePhoto" style="display: inline-block" v-if="!this.hasImageData"><camera-button></camera-button></div>
    <div class="photo-block" v-else>
        <img :src="imageData" class="photo">
        <v-ons-icon class="cancel-button" icon="fa-times" size="45px" @click="cancelPhoto"></v-ons-icon>
    </div>
    <div class="bottom-bar" v-if="!this.isIOS">
      <div class="toolbar">
        <div class="toolbar__left">
        </div>
        <div class="toolbar__center">
        </div>
        <div class="toolbar__right mr10">
        <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="selectPriority">
          <ons-icon icon="ion-compose" size="25px"></ons-icon>
          {{ this.messages.buttonLabel.post }}
        </span>
        </div>
      </div>
    </div>
    <v-ons-toolbar class="ios-bottom-bar" style="padding-top: 0;" v-else="this.isIOS">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
          <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="selectPriority"><ons-icon icon="ion-compose" size="25px"></ons-icon> Post</span>
      </div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import GoogleMap from './GoogleMap';
import CameraButton from './CameraButton';
import { WEB_API_URL } from '../../.env';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';
import TsukubaSpots from '../assets/TsukubaSpots';

const focus = {
  inserted(el) {
    el.focus();
  },
};

const resize = {
  update(el) {
    const textForm = el;
    if (textForm.scrollHeight > textForm.offsetHeight) {
      textForm.rows += 1;
    }
  },
};
// 引数はbase64形式の文字列
function toBlob(base64) {
  const bin = atob(base64.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    buffer[i] = bin.charCodeAt(i);
  }
    // Blobを作成
  try {
    const blob = new Blob([buffer.buffer], {
      type: 'image/jpeg',
    });
    return blob;
  } catch (e) {
    return false;
  }
}

function takePhoto() {
  navigator.camera.getPicture((imageData) => {
    const head = 'data:image/jpeg;base64,';
    this.imageData = head + imageData;
  }, (error) => {
    console.log(error);
  }, {
    quality: 50,
    destinationType: navigator.camera.DestinationType.DATA_URL,
    sourceType: navigator.camera.PictureSourceType.CAMERA,
    correctOrientation: true,
  });
}

function postProblem(priority) {
  this.isPosting = true;
  const data = new FormData();
  data.append('problem[comment]', this.postComment);
  data.append('problem[latitude]', this.latitude);
  data.append('problem[longitude]', this.longitude);
  data.append('problem[response_priority]', priority);

  if (this.imageData !== '') {
    const dataURL = this.imageData;
    const head = 'data:image/jpeg;base64,';
    const blob = toBlob(dataURL.substr(head.length));
    data.append('problem[image]', blob, 'blob.jpg');
  }

  const token = window.localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: token },
  };
  axios.post(`${WEB_API_URL}/v1/problems`, data, config)
      .then(() => {
        this.FETCH_PROBLEMS();
        this.isPosting = false;
        ons.notification.alert({
          title: '',
          message: this.messages.info.post,
          callback: () => {
            this.pageStack.splice(1, this.pageStack.length - 1);
          },
        });
      }).catch((error) => {
        this.isPosting = false;
        console.log(error);
        ons.notification.alert({
          title: '',
          message: this.messages.error.post,
        });
      });

    //added by savong testing 2019311
    axios.get(`${WEB_API_URL}/v1/problems`, config)
        .then((problem) => {
            console.log(problem);
            auto_response(this.postComment, problem.data, config, problem.data.length);
        })
        .catch((error) => {
            console.log(error);
            ons.notification.alert({
                title: this.messages.error.connectTitle,
                message: this.messages.error.connectBody,
            });
        });
    //ended added by savong testing 2019311
}
//added by savong testing 2019311
function auto_response(postComment, problemData, config, new_problem_num)
{
    var topk = [];
    topk = getTopKTsukubaSpots(config, postComment, TsukubaSpots, 1);
    var topk1 = [];
    topk1 = getPastAnswer(config, new_problem_num, postComment, problemData, topk, 1);
}
function getTopKTsukubaSpots(config, postComment, TsukubaSpots, k)
{
    var scores = [];
    for(var TsukubaSpot in TsukubaSpots)
    {
        scores.push(
        {
            Name: "[AUTO-RESPONSE]: " + TsukubaSpots[TsukubaSpot].Name+" is strongly recommended. "+ "The detail can be found here: "+ TsukubaSpots[TsukubaSpot].url_link +".",
            ShopSpots: 1,
            //url_link: TsukubaSpots[TsukubaSpot].url_link,
            value: Math.round(similarity(postComment, TsukubaSpots[TsukubaSpot].Category)*100)/100
        }
        );
    }
    return scores;
}

/*function getTopKTsukubaSpots(config, postComment, TsukubaSpots, k)
{
    var scores = [];
    for(var TsukubaSpot in TsukubaSpots)
    {
        scores.push(
        {
            Name: TsukubaSpots[TsukubaSpot].Name,
            url_link: TsukubaSpots[TsukubaSpot].url_link,
            value: Math.round(similarity(postComment, TsukubaSpots[TsukubaSpot].Category)*100)/100
        }
        );
    }
    scores.sort(function (a, b) {
        return b.value - a.value
    });
    return scores.slice(0, k);
}*/

function getPastAnswer(config, new_problem_num, postComment, problemData,topk, k)
{
    var scores = [];
    scores = topk;
    for(var i=0;i<problemData.length;i++)
    {
        scores.push(
        {
            Name: problemData[i].id,
            Problem: problemData[i].comment,
            ShopSpots: 0,
            value: Math.round(similarity(postComment, problemData[i].comment)*100)/100
        }
        );
    }
    scores.sort(function (a, b) {
        return b.value - a.value
    });

    var similarQuestion = [];
    similarQuestion = scores.slice(0, k);

    for(var i=0;i<similarQuestion.length;i++)
    {
        if(similarQuestion[i].value>0.6)
        if(similarQuestion[i].ShopSpots == 1)
        {
            var problem_num = new_problem_num+1;
            const autoresponse = {
                comment: similarQuestion[i].Name,
            };
            axios.post(`${WEB_API_URL}/v1/problems/${problem_num}/responses`, autoresponse, config)
                .then((response) => {
                    this.responses.push(response.data);
                    this.replyComment = '';
                    this.isPosting = false;
                    scrollBottom();
                })
                .catch((error) => {
                    console.log(error);
                    ons.notification.alert({
                        title: '',
                        message: this.messages.error.post,
                    });
                    this.isPosting = false;
                });
        }
        else if(similarQuestion[i].ShopSpots == 0)
        {
             axios.get(`${WEB_API_URL}/v1/problems/${similarQuestion[i].Name}/responses`, config)
                .then((response) => {
                    console.log(response);
                    if(response.data.length>0)
                    {
                        var pastResponse="";
                        for(var i=0;i<response.data.length;i++)
                        {
                            if(response.data[i].comment!=null)
                                pastResponse = pastResponse + response.data[i].comment + "; ";
                        }

                        if(pastResponse.indexOf("[AUTO-RESPONSE]: ") == -1 )
                        {
                            pastResponse = "[AUTO-RESPONSE]: " + pastResponse;
                        }

                        var problem_num = new_problem_num+1;
                        const autoresponse = {
                            comment: pastResponse,
                        };
                        axios.post(`${WEB_API_URL}/v1/problems/${problem_num}/responses`, autoresponse, config)
                        .then((response) => {
                            this.responses.push(response.data);
                            this.replyComment = '';
                            this.isPosting = false;
                            scrollBottom();
                        })
                        .catch((error) => {
                            console.log(error);
                            ons.notification.alert({
                                title: '',
                                message: this.messages.error.post,
                            });
                            this.isPosting = false;
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    ons.notification.alert({
                        title: this.messages.error.connectTitle,
                        message: this.messages.error.connectBody,
                        callback: this.getResponse,
                    });
                });
        }
    }

    return scores.slice(0, k);
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
//ended added by savong testing 2019311

export default {
  name: 'camera-page',
  components: {
    CustomToolbar,
    GoogleMap,
    CameraButton,
  },
  props: ['pageStack'],
  directives: { focus, resize },
  data() {
    return {
      latitude: '',
      longitude: '',
      address: '',
      isMapError: false,
      postComment: '',
      imageData: '',
      isPosting: false,
      messages: this.getMessages(),
      TsukubaSpots,
    };
  },
  computed: {
    hasImageData() {
      return this.imageData !== '';
    },
    isIOS() {
      /* eslint-disable no-undef */
      try {
        return device.platform === 'iOS';
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    postEnabled() {
      return !this.isPosting && (this.postComment !== '' || this.imageData !== '');
    },
  },
  methods: {
    takePhoto,
    postProblem,
    auto_response,
    cancelPhoto() {
      this.imageData = '';
    },
    ...mapActions([
      FETCH_PROBLEMS,
    ]),
    selectPriority() {
      const self = this;
      ons.notification.confirm({
        title: this.messages.postMessage,
        messageHTML: ' ',
        buttonLabels: this.messages.postButtonLabels,
        animation: 'default',
        cancelable: true,
        callback(index) {
          let priority;
          if (index === 0) {
            priority = 'high';
          } else if (index === 1) {
            priority = 'default';
          } else if (index === 2) {
            priority = 'low';
          }

          if (priority) {
            postProblem.call(self, priority);
          }
        },
      });
    },
    getMessages(){
      const messages = window.localStorage.getItem('messages');
      return JSON.parse(messages).CameraPage;
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
    (position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    () => {
      ons.notification.alert({
        title: '',
        message: this.messages.error.location,
      });
      this.isMapError = true;
    });
  },
};

</script>

<style lang="scss" scoped >
@import "./../../config.scss";

 #text-form {
   width: 100%;
   margin: 10px 0;
   background-color: transparent;
   border: 0;
 }
 #post-btn{
   display: block;
   width: 80px;
   margin-left: auto;
   margin-bottom: 10px;
 }
.trim-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.bottom-bar{
  position: fixed;
}
.photo {
  width: 100%;
}
.photo-block {
  position: relative;
}
.cancel-button {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  padding: 0 6px;
}
.bottom-bar {
  border-top: solid 1px rgba(127, 127, 127, 0.5);
}
.bottom-bar > .toolbar {
  background-color: #fff;
}
.ios-bottom-bar {
  background-color: #fff;
  border-top: solid 1px rgba(127, 127, 127, 0.5);
  top: auto;
  bottom: 0;
}
.post-problem-btn {
  background-color: $main-color;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
}
.mr10 {
  margin-right: 10px;
}
</style>
