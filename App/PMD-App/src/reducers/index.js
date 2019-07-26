import {
  FETCHING_TASKS,
  FETCHING_TASKS_SUCCESS,
  FETCHING_TASKS_FAILURE,
  ADDING_TASK,
  ADDING_TASK_SUCCESS,
  ADDING_TASK_FAILURE,
  DELETING_TASK,
  DELETING_TASK_SUCCESS,
  DELETING_TASK_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOG_OUT,
  USER_INFO_START,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR
} from "../actions";

const initialState = {
  tasks: [],
  fetchingTasks: false,
  addingTask: false,
  updatingTask: false,
  deletingTask: false,
  error: null,
  user: { username: "", id: "" },
  loggingIn: false,
  usersFetched: false,
  signingUp: false,
  loggedIn: false,
  error: null,
  edit: false
};

const defaultState = {
  user: { username: "", id: "" },
  loggingIn: false,
  usersFetched: false,
  signingUp: false,
  loggedIn: false,
  error: null,
  edit: false
};
export default (state = initialState, action) => {
  console.log(state);

  switch (action.type) {
    case FETCHING_TASKS:
      return { ...state, fetchingTasks: true };
    case FETCHING_TASKS_SUCCESS:
      return { ...state, fetchingTasks: false, tasks: action.payload };
    case FETCHING_TASKS_FAILURE:
      return { ...state, fetchingTasks: false, error: action.payload };
    case ADDING_TASK:
      return { ...state, addingTask: true };
    case ADDING_TASK_SUCCESS:
      return { ...state, addingTask: false, tasks: action.payload };
    case ADDING_TASK_FAILURE:
      return { ...state, addingTask: false, error: action.payload };
    case DELETING_TASK:
      return { ...state, deletingTask: true };
    case DELETING_TASK_SUCCESS:
      return { ...state, deletingTask: false, tasks: action.payload };
    case DELETING_TASK_FAILURE:
      return { ...state, deletingTask: false, error: action.payload };

    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        error: null,
        loggingIn: true,
        loggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        loggingIn: false,
        loggedIn: true,
        token: action.payload.token,
        user: { ...state.user, username: action.payload.username }
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
        error: null,
        signingUp: true
      };
    case USER_INFO_START:
      return {
        ...state,
        error: null,
        usersFetched: false
      };
    case USER_INFO_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case USER_INFO_SUCCESS:
      console.log(action.payload);
      const userData = action.payload.data.filter(
        user => user.username == "testing"
      )[0];
      console.log(userData, "userData");
      // console.log(state.user.username, 'username')
      console.log(action.payload.data);
      return {
        ...state,
        user: {
          ...state.user,
          username: userData.username,
          role: userData.role,
          id: userData.id
        },
        usersFetched: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
        signingUp: false,
        loggedIn: true
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signingUp: false,
        error: action.payload
      };
    case LOG_OUT:
      return defaultState;
  }
};
