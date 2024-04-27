import axios from "axios";
import { setError, setLoading, setTasks } from "../features/task/taskSlice";

const BASE_URL = "http://localhost:4000/auth";
interface Task {
  id: string;
  taskName: string;
  description: string;
  dueDate: string;
  status: string;
}
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error("Signup failed");
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get<Task[]>(
      "http://localhost:4000/tasks",
      config
    );

    dispatch(setTasks(response.data));

    dispatch(setLoading(false));
  } catch (error: any) {
    dispatch(setError(error.message));

    dispatch(setLoading(false));
  }
};

// Function to perform logout
export const logout = () => async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(`${BASE_URL}/logout`, null, config);
    console.log(res.data);

    return res.data;
  } catch (error: any) {
    console.error("Logout failed:", error.message);
  }
};

// Function to add a task
export const addTaskAction = async (taskData: Omit<Task, "id">) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.post<Task>(
      "http://localhost:4000/tasks",
      taskData,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to add task:", error.message);
  }
};

// Function to add a task
export const deleteTaskAction = async (taskId: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.delete<Task>(
      `http://localhost:4000/tasks/${taskId}`,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to delete task:", error.message);
  }
};

// Function to add a task
export const editTaskAction = async (
  id: string,
  taskName: string,
  taskDescription: string,
  dueDate: string,
  status: string
) => {
  try {
    const taskId = id;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const body = {
      title: taskName,
      description: taskDescription,
      dueDate: dueDate,
      status: status,
    };
    const response = await axios.put<Task>(
      `http://localhost:4000/tasks/${taskId}`,
      body,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to add task:", error.message);
  }
};
