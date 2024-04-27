import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../apis/authApi";
import SingleTask from "../singleTask/SingleTask";
import styles from "./taskShowcasePanel.module.css";

const TaskShowcasePanel = (props) => {
  const dispatch = useDispatch();
  const [updateDelete, setUpdateDelete] = useState(false);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, props.value, updateDelete]);

  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const error = useSelector((state) => state.task.error);

  return (
    <div>
      <h5 className="text-accent mb-3 ms-3">Your Tasks</h5>
      <div className={`mt-3 ${styles.taskShowcasePanel}`}>
        <div className={styles.taskList}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((task) => (
              <SingleTask
                key={task._id}
                taskId={task._id}
                taskName={task.title}
                description={task.description}
                dueDate={task.dueDate}
                taskStatus={task.status}
                setUpdateDelete={setUpdateDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskShowcasePanel;
