import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../features/task/taskSlice";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./taskInputArea.module.css";

const TaskInputArea = ({ handleTaskUpdate }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("Todo");
  const [updateBtn, setUpdateBtn] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const editedTask = useSelector((state) => state.task.editedTaskValues);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editedTask) {
      setUpdateBtn(true);
      setTaskName(editedTask.taskName);
      setTaskDescription(editedTask.description);
      setTaskStatus(editedTask.status);
      setSelected(new Date(editedTask.dueDate));
    }
  }, [editedTask]);

  const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName || !taskDescription || !selected) return;
    if (editedTask) {
      // Dispatch editTask action with updated task data
      dispatch(
        editTask({
          id: editedTask.taskId,
          title: taskName,
          description: taskDescription,
          dueDate: format(selected, "PP"),
          status: taskStatus,
        })
      );
    } else {
      // Dispatch addTask action if no edited task
      dispatch(
        addTask({
          title: taskName,
          description: taskDescription,
          dueDate: format(selected, "PP"),
          status: taskStatus,
        })
      );
    }

    // Clear form fields after adding/editing task
    setTaskName("");
    setTaskDescription("");
    setTaskStatus("Todo");
    setSelected(new Date());
    setUpdateBtn(false);
    handleTaskUpdate();
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
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Select>
          <button className="common-btn">{updateBtn ? "Update" : "Add"}</button>
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
