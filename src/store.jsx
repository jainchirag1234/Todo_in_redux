/* eslint-disable no-case-declarations */
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

// Action Types
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";
const EDIT_TASK = "task/edit";

// Initial State
const initialState = {
  task: [],
};

// Reducer
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      return {
        ...state,
        task: state.task.filter((_, index) => index !== action.payload),
      };

    case FETCH_TASK:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };

    case EDIT_TASK:
      const updatedTasks = state.task.map((curTask, index) =>
        index === action.payload.index ? action.payload.value : curTask,
      );
      return {
        ...state,
        task: updatedTasks,
      };

    default:
      return state;
  }
};

// Store
export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// Debug log
store.subscribe(() => {
  console.log("Updated Redux State:", store.getState());
});

// Action Creators
export const addTask = (data) => ({ type: ADD_TASK, payload: data });
export const deleteTask = (index) => ({ type: DELETE_TASK, payload: index });
export const editTask = (index, value) => ({
  type: EDIT_TASK,
  payload: { index, value },
});

// Thunk Action
export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3",
      );
      const task = await res.json();
      dispatch({
        type: FETCH_TASK,
        payload: task.map((t) => t.title),
      });
    } catch (error) {
      console.log(error);
    }
  };
};
