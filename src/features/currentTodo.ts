import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../types/Todo";

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: "currentTodo",
  initialState,
  reducers: {
    checkCurrentTodo(currentTodo, { payload }: PayloadAction<Todo> ) {
      return currentTodo = {
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
        userId: payload.userId
      };
    },
    unCheckCurrentTodo(currentTodo) {
      return currentTodo = null;
    },

  },
});
