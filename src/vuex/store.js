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
      page: 1,
      loading: false,
      isError: false,
    },
    fetchAllProblemsStatus: {
      isError: false,
      isCompleted: false,
    },
    selectedProblem: { },
  },
  getters: {
    problems: state => state.problems,
    fetchProblemsStatus: state => state.fetchProblemsStatus,
    allProblems: state => state.allProblems,
    fetchAllProblemsStatus: state => state.fetchAllProblemsStatus,
    selectedProblem: state => state.selectedProblem,
  },
  actions,
  mutations,
});
