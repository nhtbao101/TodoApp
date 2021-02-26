import { configureStore } from "@reduxjs/toolkit";
import todos from "../features/slice/todo.slice";

export default configureStore({
  reducer: {
    todos: todos,
  },
});
