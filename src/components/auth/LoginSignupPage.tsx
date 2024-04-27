import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { login, signup } from "../../apis/authApi";
import { selectAuthState } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./loginSignupPage.module.css";

const LoginSignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthError, setIsAuthError] = useState(false);
  const navigate = useNavigate();

  // Redirect to task manager page if user is already authenticated

  if (authState.isAuthenticated == true && !!localStorage.getItem("token")) {
    navigate("/task-manager");
  }
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Dispatch login action
      const userData = await login(username, password);
      const token = userData.token;
      dispatch(loginSuccess(token));
      // Redirect to task manager page
      navigate("/task-manager");
    } catch (error) {
      // Handle login error
      setIsAuthError(!isAuthError);
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Dispatch signup action
      await signup(username, password);
      // TODO: Handle Signup error
      // Show signup success message
      alert("Signup successful! Please login now.");

      // Auto-fill login form fields
      setUsername(username);
      setPassword(password);

      // Reset form fields
      setUsername("");
      setPassword("");
      setIsAuthError(false);
      setIsLogin(true);
    } catch (error) {
      // Handle signup error
      setIsAuthError(!isAuthError);
    }
  };
  const handleChangeForm = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setIsAuthError(false);
  };
  return (
    <div className={styles.authPanel}>
      <Container>
        <div className={styles.innerWrapper}>
          <div>
            <h2 className="text-white fw-bold">
              {isLogin ? `Login` : `SignUp`}
            </h2>
          </div>
          {isLogin ? (
            <div className={styles.login}>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {isAuthError ? (
                  <p className={styles.label}>Username or Password is Wrong</p>
                ) : (
                  ""
                )}
                <Button className="common-btn" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          ) : (
            <div className={styles.login}>
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {isAuthError ? (
                  <p className={styles.label}>Username Already Exists</p>
                ) : (
                  ""
                )}
                <Button className="common-btn" type="submit">
                  Signup
                </Button>
              </Form>
            </div>
          )}

          <p className={`mt-3 ${styles.switchForm}`}>
            <button onClick={handleChangeForm}>
              {isLogin ? `New here? Sign Up` : `Already have an account? Login`}
            </button>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LoginSignupPage;
