<template id="top-page">
  <v-ons-page>
    <custom-toolbar><div class="title"><img class="title-icon" src="../assets/s_logo.png" /></div></custom-toolbar>
    <v-ons-pull-hook :action="loadItem" @changestate="state = $event.state">
      <span v-show="state === 'initial'"> Pull to refresh </span>
      <span v-show="state === 'preaction'"> Release </span>
      <span v-show="state === 'action'"> Loading... </span>
    </v-ons-pull-hook>
    <main class="h100">
        <div class="centering h100" v-if="!fetchProblemsStatus.isCompleted">
            <v-ons-progress-circular indeterminate ></v-ons-progress-circular>
        </div>
        <ul class="card-list">
            <li v-for="problem in problems" @click="toResponse(problem)">
                <problem-card :problem="problem" class="card"></problem-card>
            </li>
        </ul>
    </main>
    <v-ons-fab position="bottom right" :style="{ backgroundColor: '#01a8ec'}" :visible="fetchProblemsStatus.isCompleted" @click="push"><v-ons-icon icon="md-edit"></v-ons-icon></v-ons-fab>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import ProblemCard from './ProblemCard';
import ResponsePage from './ResponsePage';
import notification from '../function/notification';
import { FETCH_PROBLEMS, REFETCH_PROBLEMS, SELECT_PROBLEM, SAW_RESPONSES_OF_PROBLEM } from '../vuex/mutation-types';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
    ProblemCard,
  },
  created() {
    notification.initialize();
    this.$store.watch(state => state.fetchProblemsStatus.isError, (isError) => {
      if (isError) {
        ons.notification.alert({
          title: 'Can\'t connect to server',
          message: 'Try again?',
          callback: this.FETCH_PROBLEMS,
        });
      }
    });

    this.FETCH_PROBLEMS();
  },
  data() {
    return {
      state: 'initial',
    };
  },
  computed: {
    ...mapGetters([
      'problems',
      'fetchProblemsStatus',
    ]),
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
  },
  props: ['pageStack'],
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
.card {
  width: 100%;
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
.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
