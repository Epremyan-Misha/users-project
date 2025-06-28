import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import User from "./User";
import "./App.css";
import Posts from "./Posts";
import Albums from "./Albums";
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginLeft: "15px",
        marginTop: "200px",
        cursor: "pointer",
      }}
    >
      {users.map((user) => (
        <div
          className="usersDiv"
          key={user.id}
          onClick={() => navigate(`/user/${user.id}`)}
          style={{
            cursor: "pointer",
            marginBottom: "10px",
            border: "solid 1px",
            borderRadius: "20px",
            width: "220px",
            height: "260px",
            padding: "10px",
          }}
        >
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s"
          />
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/posts" element={<Posts />} />
        <Route path="/user/:id/albums" element={<Albums />} />
      </Routes>
    </Router>
  );
}

export default App;
