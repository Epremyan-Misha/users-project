import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import User from "./User";
import Posts from "./Posts";
import Albums from "./Albums";
import Users from "./Users";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users users={users} />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/posts" element={<Posts />} />
        <Route path="/user/:id/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
