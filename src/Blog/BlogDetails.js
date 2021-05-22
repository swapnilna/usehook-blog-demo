import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./blog.css";

const BlogDetails = (props) => {
  const { match, history } = props;

  const [loading, toggleLoading] = useState(true);

  const [blogDetails, setBlogDetails] = useState(null);
  const [blogComments, setBlogComments] = useState(null);

  useEffect(() => {
    toggleLoading(true);
    const blogDetailsPromise = axios.get(
      `https://jsonplaceholder.typicode.com/posts/${match.params.blogId}`
    );

    const blogCommentsPromise = axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${match.params.blogId}`
    );

    Promise.all([blogDetailsPromise, blogCommentsPromise]).then((response) => {
      setBlogDetails(response[0].data);
      setBlogComments(response[1].data);
      toggleLoading(false);
    });
  }, [match.params.blogId]);

  const blogId = parseInt(match.params.blogId, 10);

  return (
    <div className="container">
      {loading ? (
        "Loading...."
      ) : (
        <>
          <div>
            <Link to="/"> <button className="pagination-btn next"> Home </button> </Link>
          </div>
          <div>
            <div className="blog-title">{blogDetails.title}</div>
            <div className="blog-content"> {blogDetails.body}</div>
          </div>

          <div> User Comments :   </div>
          <ul className="comment-list">
            {blogComments.map((blogComment) => {
              return (
                <li className="comment-list-item" key={blogComment.id}>
                  <div>{blogComment.body}</div>
                  <div>User Email: {blogComment.email}</div>
                </li>
              );
            })}
          </ul>

          <div className="btn-container">
            <button
              className={`pagination-btn previous ${blogId === 1 ? "disabled" : ""}`}
              onClick={() => {
                let blogId = parseInt(match.params.blogId, 10);
                history.push(`/blogs/${--blogId}`);
              }}
            >
              Previous
            </button>
            {"  "}
            <button
              className={`pagination-btn next ${blogId === 100 ? "disabled" : ""}`}
              onClick={() => {
                let blogId = parseInt(match.params.blogId, 10);
                history.push(`/blogs/${++blogId}`);
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
