import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskAction,
  deleteTaskAction,
  editTaskAction,
} from "../../apis/authApi";

interface Task {
  id: string;
  taskName: string;
  taskDescription: string;
  dueDate: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
  editedTaskValues: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  editedTaskValues: null,
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      addTaskAction(action.payload);
    },
    deleteTask: (state, action) => {
      deleteTaskAction(action.payload);
    },
    editTask: (state, action) => {
      editTaskAction(
        action.payload.id,
        action.payload.title,
        action.payload.description,
        action.payload.dueDate,
        action.payload.status.toString()
      );
    },
    editedTaskValue: (state, action) => {
      state.editedTaskValues = action.payload;
    },

    // New reducer to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // New reducer to set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // New reducer to set tasks state
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setTasks,
  addTask,
  deleteTask,
  editTask,
  editedTaskValue,
} = taskSlice.actions;

export default taskSlice.reducer;
