import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    problems: [],
    fetchProblemsStatus: {
      isError: false,
      isCompleted: false,
    },
    allProblems: {
      data: [],
      page: 0,
      loading: false,
      isError: false,
    },
    selectedProblem: { },
  },
  getters: {
    problems: state => state.problems,
    fetchProblemsStatus: state => state.fetchProblemsStatus,
    allProblems: state => state.allProblems,
    selectedProblem: state => state.selectedProblem,
  },
  actions,
  mutations,
});
