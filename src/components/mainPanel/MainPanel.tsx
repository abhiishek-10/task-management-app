import TaskInputArea from "../taskInputArea/TaskInputArea";
import TaskShowcasePanel from "../taskShowcasePanel/TaskShowcasePanel";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import styles from "./mainPanel.module.css";
import { useEffect, useState } from "react";

const UseRedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return;
};

const mainPanelView = () => {
  const [value, setValue] = useState(false);

  const handleTaskUpdate = () => {
    // Logic to update value
    setValue((prev) => !prev);
  };
  return (
    <main>
      <CustomNavbar />
      <div className="site-content">
        <Container>
          <div className={` ${styles.mainPanelWrapper}`}>
            <div className={styles.mainPanel}>
              <TaskInputArea handleTaskUpdate={handleTaskUpdate} />
              <TaskShowcasePanel value={value} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

const MainPanel = () => {
  if (localStorage.getItem("token") !== null) {
    return mainPanelView();
  } else {
    return UseRedirectToLogin();
  }
};

export default MainPanel;
