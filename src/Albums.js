import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
const Albums = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, [id]);

  if (!user) return <div>Loading user...</div>;

  return (
    <div>
      <h2 style={{ marginLeft: "850px" }}>Albums by {user.name}</h2>
      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <div>
          {albums.map((album) => (
            <div
              className="divForAlbums"
              key={album.id}
              style={{
                marginBottom: "1rem",
                gap: "15px",
                marginTop: "25px",
                padding: "10px",
                height: "50px",
                border: "1px solid #ccc",
              }}
            >
              <strong style={{ fontSize: "20px", marginLeft: "700px" }}>
                {album.title}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Albums;
