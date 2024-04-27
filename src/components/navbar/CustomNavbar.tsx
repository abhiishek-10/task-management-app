import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./customNavbar.module.css";
import { logout } from "../../apis/authApi";

function CustomNavbar() {
  const authState = useSelector(selectAuthState);
  const navigate = useNavigate();

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Dispatch login action
      const logOut = await logout();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      // dispatch(loginSuccess(token));
      console.log(logOut);
      navigate("/");
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <Container className="pt-5">
      <Navbar className={styles.navbar}>
        <Navbar.Brand href="#home" className={styles.navbarLogo}>
          Task Manager
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className={styles.userInfo}>
            Signed in as:
            <span className={styles.userName}>
              {localStorage.getItem("username") ?? "Unknown"}
            </span>
          </Navbar.Text>

          <div className={`ms-2 ${styles.authBtn}`}>
            {localStorage.getItem("token") ? (
              <button className="common-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="common-btn">Login</button>
            )}
          </div>
        </Navbar.Collapse>
        <Navbar.Toggle />
      </Navbar>
    </Container>
  );
}

export default CustomNavbar;
