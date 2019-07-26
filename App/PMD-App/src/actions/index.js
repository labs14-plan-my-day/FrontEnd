import axios from "axios";

const url = "http://localhost:3333/tasks";

export const ADDING_TASK = "ADDING_TASK";
export const ADDING_TASK_SUCCESS = "ADDING_TASK_SUCCESS";
export const ADDING_TASK_FAILURE = "ADDING_TASK_FAILURE";
export const DELETING_TASK = "DELETING_TASK";
export const DELETING_TASK_SUCCESS = "DELETING_TASK_SUCCESS";
export const DELETING_TASK_FAILURE = "DELETING_TASK_FAILURE";
export const FETCHING_TASKS = "FETCHING_TASKS";
export const FETCHING_TASKS_SUCCESS = "FETCHING_TASKS_SUCCESS";
export const FETCHING_TASKS_FAILURE = "FETCHING_TASKS_FAILURE";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOG_OUT = "LOG_OUT";
export const USER_INFO_START = "USER_INFO_START";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_ERROR = "USER_INFO_ERROR";

export const addTask = task => dispatch => {
  dispatch({ type: ADDING_TASK });
  axios
    .post(url, task)

    .then(({ data }) =>
      dispatch({
        type: ADDING_TASK_SUCCESS,
        payload: data
      })
    )

    .catch(({ data }) =>
      dispatch({
        type: ADDING_TASK_FAILURE,
        payload: data
      })
    );
};

export const deleteTask = id => dispatch => {
  dispatch({ type: DELETING_TASK });

  axios
    .delete(`${url}/${id}`)
    .then(({ data }) =>
      dispatch({
        type: DELETING_TASK_SUCCESS,
        payload: data
      })
    )

    .catch(({ data }) =>
      dispatch({
        type: DELETING_TASK_FAILURE,
        payload: data
      })
    );
};

export const getTasks = () => dispatch => {
  dispatch({ type: FETCHING_TASKS });

  axios
    .get(url)
    .then(({ data }) =>
      dispatch({
        type: FETCHING_TASKS_SUCCESS,
        payload: data
      })
    )

    .catch(({ data }) =>
      dispatch({
        type: FETCHING_TASKS_FAILURE,
        payload: data
      })
    );
};
export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START });

  return axios
    .post("https://", creds)
    .then(res => {
      localStorage.setItem("", res.data.token);
      res.data.username = creds.username;
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      dispatch({ type: USER_INFO_START });
      return axios
        .get("https://", {
          headers: { Authorization: localStorage.getItem("") }
        })
        .then(res => {
          dispatch({ type: USER_INFO_SUCCESS, payload: res });
        })
        .catch(err => dispatch({ type: USER_INFO_ERROR, payload: err }));
    })
    .catch(err => dispatch({ type: LOGIN_ERROR, payload: err }));
};

export const signup = creds => dispatch => {
  dispatch({ type: SIGNUP_START });

  return axios
    .post("https://", creds)
    .then(res => {
      localStorage.setItem("", res.data.token);
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data.token });
    })
    .catch(err => console.log(err));
};

export const logOut = () => {
  localStorage.removeItem("");
  return {
    type: LOG_OUT
  };
};
