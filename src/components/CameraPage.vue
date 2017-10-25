<template id="camera-page">
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <ons-progress-bar indeterminate  v-show="this.isPosting === true"></ons-progress-bar>
    <ons-progress-bar indeterminate  v-show="this.isPosting === true"></ons-progress-bar>
    <textarea id="text-form" class="textarea" rows="5" placeholder="What's your problem?" v-model="postComment" name='description' v-focus v-resize></textarea>
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
            <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="selectPriority"><ons-icon icon="ion-compose" size="25px"></ons-icon> Post</span>
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
import { WEB_API_URL, QUESTIONNAIRE_URL } from '../../.env';
import { FETCH_PROBLEMS } from '../vuex/mutation-types';

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
          message: 'Post has been completed.',
          callback: () => {
            this.pageStack.splice(1, this.pageStack.length - 1);
            if (!window.localStorage.getItem('got_present')) {
              setTimeout(() => {
                axios.get(`${WEB_API_URL}/v1/problems/me/count`, config)
                .then((response) => {
                  if (response.data.count % 5 === 0) {
                    if (window.localStorage.getItem('complete_questionnaire')) {
                      ons.notification.alert({
                        title: 'Thanks for your cooperation!',
                        messageHTML: '<p>Please, Open present page.</br>Other > Get Present</p>',
                      });
                    } else {
                      ons.notification.confirm({
                        title: 'Please cooperate with the questionnaire.',
                        message: ' ',
                        buttonLabels: ['No', 'Yes'],
                        callback(index) {
                          if (index === 1) {
                            window.localStorage.setItem('complete_questionnaire', true);
                            window.open(QUESTIONNAIRE_URL);
                          }
                        },
                      });
                    }
                  }
                });
              }, 200);
            }
          },
        });
      }).catch((error) => {
        this.isPosting = false;
        console.log(error);
        ons.notification.alert({
          title: '',
          message: 'Sorry, posting failed...',
        });
      });
}

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
    cancelPhoto() {
      this.imageData = '';
    },
    ...mapActions([
      FETCH_PROBLEMS,
    ]),
    selectPriority() {
      const self = this;
      ons.notification.confirm({
        title: 'Do you need help for this problem?',
        messageHTML: ' ',
        buttonLabels: ['Yes, immediately', 'Yes', 'No'],
        animation: 'default',
        cancelable: true,
        callback(index) {
          let priority = 'default';
          if (index === 0) {
            priority = 'high';
          } else if (index === 2) {
            priority = 'low';
          }
          postProblem.call(self, priority);
        },
      });
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
        message: "can't get your position",
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
