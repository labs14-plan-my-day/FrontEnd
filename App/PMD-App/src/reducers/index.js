import {FETCHING_TASKS, FETCHING_TASKS_SUCCESS, FETCHING_TASKS_FAILURE, ADDING_TASK, ADDING_TASK_SUCCESS,
  ADDING_TASK_FAILURE, DELETING_TASK, DELETING_TASK_SUCCESS, DELETING_TASK_FAILURE } from '../actions';

 const initialState = {
   tasks: [],
   fetchingTasks: false,
   addingTask: false,
   updatingTask: false,
   deletingTask: false,
   error: null
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
}