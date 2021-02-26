import { createSlice } from "@reduxjs/toolkit";

const list = [
  {
    title: "Complete todo app",
  },
];

const todo = createSlice({
  name: "todos",
  initialState: list,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = todo;
export const { addTodo } = actions;
export default reducer;
