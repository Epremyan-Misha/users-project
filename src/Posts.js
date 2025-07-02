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
  const renderPosts = () => {
    const postItems = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      postItems.push(
        <li className="postInfo" key={post.id}>
          <h2 style={{ padding: "15px" }}>{post.title}</h2>
          <p style={{ padding: "15px" }}>{post.body}</p>
          <button
            onClick={() => openCommentsModal(post)}
            className="commentsBtn"
          >
            Comments
          </button>
        </li>
      );
    }
    return postItems;
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ marginLeft: "800px" }}>Posts by {user.name}</h2>
      {posts.length === 0 ? <p>No posts found.</p> : <ul>{renderPosts()}</ul>}
      {selectedPost && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
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

            <button className="closeBtn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
