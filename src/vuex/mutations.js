import {
  FETCH_PROBLEMS_START, FETCH_PROBLEMS_FINISH, FETCH_PROBLEMS_ERROR,
  REFETCH_PROBLEMS,
  FETCH_ALL_PROBLEMS_START, FETCH_ALL_PROBLEMS_FINISH, FETCH_ALL_PROBLEMS_ERROR,
  REFETCH_ALL_PROBLEMS,
  SELECT_PROBLEM, SAW_RESPONSES_OF_PROBLEM,
  FETCH_USER_INFO_START, FETCH_USER_INFO_FINISH, FETCH_USER_INFO_ERROR,
} from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [FETCH_PROBLEMS_START](state) {
    state.fetchProblemsStatus = {
      isError: false,
      isCompleted: false,
    };
  },
  [FETCH_PROBLEMS_FINISH](state, problems) {
    state.problems = problems;
    state.fetchProblemsStatus = {
      isError: false,
      isCompleted: true,
    };
  },
  [FETCH_PROBLEMS_ERROR](state) {
    state.fetchProblemsStatus = {
      isError: true,
      isCompleted: false,
    };
  },
  [REFETCH_PROBLEMS](state, problems) {
    state.problems = problems;
  },
  [FETCH_ALL_PROBLEMS_START](state) {
    state.allProblems.isError = false;
    state.allProblems.loading = true;
  },
  [FETCH_ALL_PROBLEMS_FINISH](state, allProblemsData) {
    state.allProblems.data = state.allProblems.data.concat(allProblemsData);
    state.allProblems.page += 1;
    state.allProblems.isError = false;
    state.allProblems.loading = false;
    state.allProblems.isFinished = allProblemsData.isFinished;
  },
  [FETCH_ALL_PROBLEMS_ERROR](state) {
    state.allProblems.isError = true;
    state.allProblems.loading = false;
  },
  [REFETCH_ALL_PROBLEMS](state, allProblemsData) {
    state.allProblems.data = allProblemsData;
    state.allProblems.isError = false;
    state.allProblems.loading = false;
    state.allProblems.page = 1;
    state.allProblems.isFinished = false;
  },
  [SELECT_PROBLEM](state, problem) {
    state.selectedProblem = problem;
  },
  [SAW_RESPONSES_OF_PROBLEM](state, problem) {
    const problemsNumber = state.problems.indexOf(problem);
    state.problems[problemsNumber].responses_seen = true;
  },
  [FETCH_USER_INFO_START](state) {
    state.userInfo.isError = false;
    state.userInfo.isCompleted = false;
  },
  [FETCH_USER_INFO_FINISH](state, userInfo) {
    state.userInfo.data = userInfo;
    state.userInfo.isError = false;
    state.userInfo.isCompleted = true;
  },
  [FETCH_USER_INFO_ERROR](state) {
    state.userInfo.isError = true;
    state.userInfo.isCompleted = false;
  },
};
