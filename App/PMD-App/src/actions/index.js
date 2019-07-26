import axios from 'axios';

const url = 'http://localhost:3333/tasks'

export const ADDING_TASK = 'ADDING_TASK';
export const ADDING_TASK_SUCCESS = 'ADDING_TASK_SUCCESS';
export const ADDING_TASK_FAILURE = 'ADDING_TASK_FAILURE';
export const DELETING_TASK = 'DELETING_TASK';
export const DELETING_TASK_SUCCESS = 'DELETING_TASK_SUCCESS';
export const DELETING_TASK_FAILURE = 'DELETING_TASK_FAILURE';
export const FETCHING_TASKS = 'FETCHING_TASKS';
export const FETCHING_TASKS_SUCCESS = 'FETCHING_TASKS_SUCCESS';
export const FETCHING_TASKS_FAILURE = 'FETCHING_TASKS_FAILURE';

export const addTask = task => dispatch => {
  dispatch({ type: ADDING_TASK });
  axios.post(url, task)

    .then(({ data }) => dispatch({
      type: ADDING_TASK_SUCCESS,
      payload: data
    }))

    .catch(({ data }) => dispatch({
      type: ADDING_TASK_FAILURE,
      payload: data
    }));
}

export const deleteTask = id => dispatch => {
  dispatch({ type: DELETING_TASK });

  axios.delete(`${url}/${id}`)
    .then(({ data }) => dispatch({
      type: DELETING_TASK_SUCCESS,
      payload: data
    }))

    .catch(({ data }) => dispatch({
      type: DELETING_TASK_FAILURE,
      payload: data
    }))
}

export const getTasks = () => dispatch => {
  dispatch({ type: FETCHING_TASKS });

  axios.get(url)
    .then(({ data }) => dispatch({
      type: FETCHING_TASKS_SUCCESS,
      payload: data
    }))

    .catch(({ data }) => dispatch({
      type: FETCHING_TASKS_FAILURE,
      payload: data
    }));
};