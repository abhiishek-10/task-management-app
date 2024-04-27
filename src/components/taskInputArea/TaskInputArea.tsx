import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/task/taskSlice";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import styles from "./taskInputArea.module.css";
import { fetchTasks } from "../../apis/authApi";

const TaskInputArea = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<string>("");
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const dispatch = useDispatch();

  const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName || !taskDescription || !selected) return;
    dispatch(
      addTask({
        title: taskName,
        description: taskDescription,
        status: taskStatus,
        dueDate: format(selected, "PP"),
      })
    );
    setTaskName("");
    setTaskDescription("");
    setSelected(new Date());
  };

  return (
    <form onSubmit={addTaskHandler}>
      <div className={styles.inputArea}>
        <div className={styles.inputGroup}>
          <FloatingLabel
            controlId="floatingInput"
            label="Task Name"
            className={` ${styles.label}`}
          >
            <Form.Control
              type="text"
              className={styles.input}
              placeholder="Go buy milk"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea2"
            className={styles.label}
            label="Task Description"
          >
            <Form.Control
              as="textarea"
              placeholder="Please buy 2% milk from the store."
              style={{ height: "100px" }}
              className={styles.input}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </FloatingLabel>
          <Form.Select
            aria-label="Default select example"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option>Select Task Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Select>
          <button className="common-btn">Add</button>
        </div>
        <DayPicker
          mode="single"
          required
          selected={selected}
          onSelect={setSelected}
          disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
        />
      </div>
    </form>
  );
};

export default TaskInputArea;
