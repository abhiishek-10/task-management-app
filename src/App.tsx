import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import MainPanel from "./components/mainPanel/MainPanel";
import LoginSignupPage from "./components/auth/LoginSignupPage";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./app/store";
import "./App.css";

function App() {
  return (
    <Router>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LoginSignupPage />} />
            <Route path="/task-manager" element={<MainPanel />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
