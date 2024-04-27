import TaskInputArea from "../taskInputArea/TaskInputArea";
import TaskShowcasePanel from "../taskShowcasePanel/TaskShowcasePanel";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import styles from "./mainPanel.module.css";

const MainPanel = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("token") === null) {
    // If not authenticated, redirect to the login page
    navigate("/");
  }

  return (
    <main>
      <CustomNavbar />
      <div className="site-content">
        <Container>
          <div className={` ${styles.mainPanelWrapper}`}>
            <div className={styles.mainPanel}>
              <TaskInputArea />
              <TaskShowcasePanel />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default MainPanel;
