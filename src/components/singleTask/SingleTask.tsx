import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, editedTaskValue } from "../../features/task/taskSlice";
import { format } from "date-fns";
import styles from "./singleTask.module.css";
import { fetchTasks } from "../../apis/authApi";

interface SingleTaskProps {
  taskId: string;
  taskName: string;
  description: string;
  dueDate: Date;
  taskStatus: string;
  setUpdateDelete: (newValue: boolean) => void;
}

const SingleTask: React.FC<SingleTaskProps> = ({
  taskId,
  taskName,
  description,
  dueDate,
  taskStatus,
  setUpdateDelete,
}) => {
  const dispatch = useDispatch();

  const editHandler = (e) => {
    e.preventDefault();

    dispatch(
      editedTaskValue({
        taskId,
        taskName,
        description,
        dueDate,
        taskStatus,
      })
    );
  };

  return (
    <div className={styles.task}>
      <div className={styles.taskDetails}>
        <div className={styles.taskName}>
          <p>{taskName}</p>
        </div>
        <div className={styles.taskDescription}>
          <p className="text-white">{description}</p>
        </div>
      </div>
      <div className={styles.date}>
        <p>
          Due: <span>{format(dueDate, "PP")}</span>
        </p>
      </div>
      <div className={styles.taskStatus}>
        <p>
          Status: <span>{taskStatus}</span>
        </p>
      </div>
      <div className={styles.taskControl}>
        <button className="common-btn" onClick={editHandler}>
          Edit
        </button>
        <button
          className="common-btn"
          onClick={() => {
            dispatch(deleteTask(taskId));
            setUpdateDelete((prev) => !prev);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTask;
