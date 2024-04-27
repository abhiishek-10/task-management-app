import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addTaskAction,
  deleteTaskAction,
  EditTaskAction,
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
      // state.tasks.push({
      //   id: nanoid(),
      //   taskName: action.payload.taskName,
      //   taskDescription: action.payload.taskDescription,
      //   dueDate: action.payload.dueDate,
      //   status: "Incomplete",
      // });
      addTaskAction(action.payload);
    },
    deleteTask: (state, action) => {
      // console.log("deleteTask", action.payload);
      deleteTaskAction(action.payload);
      // state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      // const { id, taskName, taskDescription, dueDate } = action.payload;
      EditTaskAction(action.payload);
      // const existingTask = state.tasks.find((task) => task.id === id);
      // if (existingTask) {
      //   existingTask.taskName = taskName;
      //   existingTask.taskDescription = taskDescription;
      //   existingTask.dueDate = dueDate;
      // }
    },
    editedTaskValue: (state, action) => {
      console.log("action.payload", action.payload);
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

// Async action to fetch tasks from the backend API
