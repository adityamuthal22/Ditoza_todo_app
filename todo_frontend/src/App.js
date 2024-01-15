import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import React from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./Components/NotFoundPage";
import Todo from "./Components/Todo/Todo";

function App() {
  const token = window.localStorage.getItem("token");

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };
  return (
    <div className="App">
      <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regiter" element={<Signup />} />
        <Route path="/todo" element={ <PrivateRoute><Todo /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
      </React.Fragment>
    </div>
  );
}

export default App;
