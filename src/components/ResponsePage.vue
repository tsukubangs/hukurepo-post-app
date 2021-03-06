<template>
  <v-ons-page>
    <custom-toolbar>Response Page</custom-toolbar>

    <v-ons-pull-hook
      :action="loadItem"
      @changestate="state = $event.state"
    >
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>

    <main>
      <v-ons-list modifier="noborder">
        <v-ons-list-item modifier="nodivider">
          <response-card :response="selectedProblem" :is-my-response="true" class="w100">
            <div @click="photoModalVisible = true">
              <photo-thumbnail :thumbnailUrl="selectedProblemThumbnailImage" v-if="!!selectedProblem.image_url" class="thumbnail" ></photo-thumbnail>
            </div>
          </response-card>
        </v-ons-list-item>
        <v-ons-list-item v-for="response in responses" modifier="nodivider">
          <response-card :response="response" :is-my-response="selectedProblem.user_id == response.user_id" class="w100">
          </response-card>
        </v-ons-list-item>
      </v-ons-list>
    </main>
    <div v-if="selectedProblem.user_id===userInfo.data.id">
      <div class="bottom-bar" v-if="!this.isIOS">
        <div class="toolbar">
          <textarea id="text-form" class="textarea bottom-bar-textarea" rows="1" placeholder="Reply message" v-model="replyComment" name='description' ></textarea>
          <div class="toolbar__right">
            <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="postResponse">Send</span>
          </div>
        </div>
      </div>
      <v-ons-toolbar class="ios-bottom-bar" style="padding-top: 0;" v-else="this.isIOS">
        <textarea id="text-form" class="textarea bottom-bar-textarea" rows="1" placeholder="Reply message" v-model="replyComment" name='description' ></textarea>
        <div class="left toolbar-ios"></div>
        <div class="center toolbar-ios"></div>
        <div class="right toolbar-ios">
          <span class="toolbar-button post-problem-btn" v-bind:disabled="!this.postEnabled" @click="postResponse">Send</span>
        </div>
      </v-ons-toolbar>
    </div>
    <v-ons-modal :visible="photoModalVisible" @click="photoModalVisible = false">
      <img :src="selectedProblemImage" class="modal-image"/>
    </v-ons-modal>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import ResponseCard from './ResponseCard';
import PhotoThumbnail from './PhotoThumbnail';
import { WEB_API_URL } from '../../.env';

import { FETCH_USER_INFO } from '../vuex/mutation-types';

function scrollBottom() {
  const pageContents = document.getElementsByClassName('page__content');
  const responsePageContent = pageContents[pageContents.length - 1];
  if (!responsePageContent) return;
  responsePageContent.scrollTop = responsePageContent.scrollHeight;
}

export default {
  name: 'response-page',
  components: {
    CustomToolbar,
    ResponseCard,
    PhotoThumbnail,
  },
  data() {
    return {
      responses: '',
      state: 'initial',
      replyComment: '',
      isPosting: false,
      photoModalVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      'selectedProblem',
      'userInfo',
    ]),
    selectedProblemImage() {
      return WEB_API_URL + this.selectedProblem.image_url;
    },
    selectedProblemThumbnailImage() {
      return WEB_API_URL + this.selectedProblem.thumbnail_url;
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
      return !this.isPosting && this.replyComment !== '';
    },
  },
  created() {
    this.FETCH_USER_INFO();
    this.getResponse();
  },
  methods: {
    ...mapActions([
      FETCH_USER_INFO,
    ]),
    loadItem(done) {
      setTimeout(() => {
        this.getResponse();
        done();
      }, 400);
    },
    postResponse() {
      this.isPosting = true;
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      const data = {
        comment: this.replyComment,
      };
      axios.post(`${WEB_API_URL}/v1/problems/${this.selectedProblem.id}/responses`, data, config)
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
          message: 'Sorry, posting failed...',
        });
        this.isPosting = false;
      });
    },
    getResponse() {
      const token = window.localStorage.getItem('access_token');
      const config = {
        headers: { Authorization: token },
      };
      axios.get(`${WEB_API_URL}/v1/problems/${this.selectedProblem.id}/responses`, config)
      .then((response) => {
        console.log(response);
        this.responses = response.data;
      })
      .catch((error) => {
        console.log(error);
        ons.notification.alert({
          title: 'Can\'t connect to server',
          message: 'Try again?',
          callback: this.getResponse,
        });
      });
    },
  },
  props: ['pageStack'],
};
</script>

<style lang="scss" scoped>
@import "./../../config.scss";

.w100{
  width: 100%;
}
main {
  padding: 5px 5px 44px;
  box-sizing: border-box;
}
.bottom-bar {
  position: fixed;
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
.toolbar-ios {
  width: auto;
}
.bottom-bar-textarea {
  padding-top: 12px;
  width: 100%;
  background-color: transparent;
  border-color: transparent;
}
.post-problem-btn {
  background-color: $main-color;
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  margin: auto 8px;
  border-radius: 15px;
}
.thumbnail {
  width: 100px;
}
.modal-image {
  width: 100%;
  object-fit: contain;
}
</style>
