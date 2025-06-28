import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

const Posts = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [id]);

  const openCommentsModal = (post) => {
    setSelectedPost(post);
    setLoadingComments(true);
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      });
  };

  const closeModal = () => {
    setSelectedPost(null);
    setComments([]);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ marginLeft: "800px" }}>Posts by {user.name}</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li
              className="postInfo"
              key={post.id}
              style={{
                borderRadius: "25px",
                border: "solid 1px",
                height: "220px",
                margin: "25px",
              }}
            >
              <h2 style={{ padding: "15px" }}>{post.title}</h2>
              <p style={{ padding: "15px" }}>{post.body}</p>
              <button
                onClick={() => openCommentsModal(post)}
                className="commentsBtn"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "15px",
                  cursor: "pointer",
                  borderRadius: "15px",
                  margin: "15px",
                  marginTop: "-10px",
                }}
              >
                Comments
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedPost && (
        <div
          className="modalOverlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeModal}
        >
          <div
            className="modalContent"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Comments for:</h3>
            <h4>{selectedPost.title}</h4>
            <p>{selectedPost.body}</p>

            {loadingComments ? (
              <p>Loading comments...</p>
            ) : comments.length === 0 ? (
              <p>No comments found.</p>
            ) : (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} style={{ marginBottom: "15px" }}>
                    <strong>{comment.name}</strong> ({comment.email})
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
