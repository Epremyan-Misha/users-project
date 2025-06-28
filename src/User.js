import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div
      className="infoDiv"
      style={{
        marginLeft: "500px",
        marginTop: "200px",
        border: "solid 1px",
        borderRadius: "25px",
        width: "800px",
        height: "480px",
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "200px",
            height: "200px",
            marginTop: "25px",
            marginLeft: "50px",
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s"
        />
        <div
          style={{
            marginLeft: "100px",
          }}
        >
          {" "}
          <p>
            <strong style={{ color: "blue" }}>Name:</strong> {user.name}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Username:</strong>
            {user.username}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Email:</strong> {user.email}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Website:</strong>{" "}
            <a href="http://${user.website}" target="_blank">
              {user.website}
            </a>
          </p>
          <p>
            <strong style={{ color: "blue" }}>Address:</strong>
            {user.address.street}, {user.address.suite}, {user.address.city}
            {user.address.zipcode}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Coordinates:</strong> Latitude:
            {user.address.geo.lat}, Longitude: {user.address.geo.lng}
          </p>
          <h3>Company Information</h3>
          <p>
            <strong style={{ color: "blue" }}>Company Name:</strong>
            {user.company.name}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Catch Phrase:</strong>
            {user.company.catchPhrase}
          </p>
          <p>
            <strong style={{ color: "blue" }}>Business:</strong>
            {user.company.bs}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "-70px", gap: "15px", marginLeft: "25px" }}>
        <button
          className="postsBtn"
          style={{
            padding: "25px",
            borderRadius: "25px ",
            color: "white",
            backgroundColor: "green",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/user/${id}/posts`)}
        >
          Posts
        </button>
        <button
          className="albumsBtn"
          style={{
            padding: "25px",
            marginLeft: "45px",
            borderRadius: "25px",
            color: "white",
            backgroundColor: "green",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/user/${id}/albums`)}
        >
          Albums
        </button>
      </div>
    </div>
  );
};

export default User;
