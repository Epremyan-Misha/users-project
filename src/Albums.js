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

  const renderAlbums = () => {
    const albumElements = [];
    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];
      albumElements.push(
        <div className="divForAlbums" key={album.id}>
          <strong style={{ fontSize: "20px", marginLeft: "700px" }}>
            {album.title}
          </strong>
        </div>
      );
    }
    return albumElements;
  };

  return (
    <div>
      <h2 style={{ marginLeft: "850px" }}>Albums by {user.name}</h2>
      {albums.length === 0 ? (
        <p>No albums found.</p>
      ) : (
        <div>{renderAlbums()}</div>
      )}
    </div>
  );
};

export default Albums;
