import axios from "axios";
import { setError, setLoading, setTasks } from "../features/task/taskSlice";

const BASE_URL = "http://localhost:3001/auth";
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
    // Set loading state to true
    dispatch(setLoading(true));

    // Get token from state (assuming it's stored after successful login)
    const token = localStorage.getItem("token");

    // Set headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch tasks from the backend API
    const response = await axios.get<Task[]>(
      "http://localhost:3001/tasks",
      config
    );

    // Set tasks state with the fetched tasks
    // response.data.forEach((task) => {
    dispatch(setTasks(response.data));
    // });

    // Set loading state to false
    dispatch(setLoading(false));
  } catch (error: any) {
    // Set error state
    dispatch(setError(error.message));

    // Set loading state to false
    dispatch(setLoading(false));
  }
};

// Function to perform logout
export const logout = () => async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Set headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Call logout API
    const res = await axios.post(`${BASE_URL}/logout`, null, config);
    console.log(res.data);
    // Clear localStorage

    return res.data;
  } catch (error: any) {
    console.error("Logout failed:", error.message);
  }
};

// Function to add a task
export const addTaskAction = async (taskData: Omit<Task, "id">) => {
  try {
    // Send POST request to the backend API to add the task
    // Set headers
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.post<Task>(
      "http://localhost:3001/tasks",
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
    // Send POST request to the backend API to delete the task
    // Set headers
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.delete<Task>(
      `http://localhost:3001/tasks/${taskId}`,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to delete task:", error.message);
  }
};

// Function to add a task
export const EditTaskAction = async (taskData: Task) => {
  try {
    const taskId = taskData.id;
    // Send POST request to the backend API to add the task
    // Set headers
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.put<Task>(
      `http://localhost:3001/tasks/${taskId}`,
      taskData,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to add task:", error.message);
  }
};
