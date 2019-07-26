import axios from "axios";
import react from "react";

// //FOR LOGIN
// export const LOGIN_START = "LOGIN_START";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_ERROR = "LOGIN_ERROR";
// export const SIGNUP_START = "SIGNUP_START";
// export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
// export const SIGNUP_ERROR = "SIGNUP_ERROR";
// export const LOG_OUT = "LOG_OUT";
// export const USER_INFO_START = "USER_INFO_START";
// export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
// export const USER_INFO_ERROR = "USER_INFO_ERROR";

//FOR LOGIN

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
