import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
const Users = ({ users }) => {
  const navigate = useNavigate();

  const renderUsers = () => {
    const userElements = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      userElements.push(
        <div
          className="usersDiv"
          key={user.id}
          onClick={() => navigate(`/user/${user.id}`)}
        >
          <img
            style={{
              width: "150px",
              height: "150px",
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s"
            alt="user avatar"
          />
          <h2>{user.name}</h2>
        </div>
      );
    }
    return userElements;
  };

  return <div className="divForRender">{renderUsers()}</div>;
};

export default Users;
