import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./customNavbar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { logOutUser } from "../../api/apis";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const authStatus = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  useEffect(() => {
    if (
      localStorage.getItem("userToken") !== null ||
      localStorage.getItem("userToken") !== "" ||
      localStorage.getItem("userToken") !== undefined
    ) {
      setIsLoggedIn(true);
      setUserToken(localStorage.getItem("userToken"));
    }
  }, [authStatus]); // Add authStatus as a dependency

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    const logoutSuccess = await logOutUser(userToken);

    if (logoutSuccess) {
      localStorage.clear();
      setIsLoggedIn(false);
      setUserToken(null);
      navigate("/");
    }
  };

  return (
    <Container className="pt-5">
      <Navbar className={styles.navbar}>
        <Navbar.Brand href="/" className={styles.navbarLogo}>
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isLoggedIn == true && userToken !== null && (
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <div className="d-flex gap-3">
              <Navbar.Text className={styles.userInfo}>
                Signed in as:
                <span className={styles.userName}>
                  {localStorage.getItem("username")}
                </span>
              </Navbar.Text>
              <button className="common-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </Navbar.Collapse>
        )}
      </Navbar>
    </Container>
  );
};

export default CustomNavbar;
