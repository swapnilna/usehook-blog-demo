import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogList = () => {

  const [blogList, setBlogList] = useState([]);
  const [blogLoding, setBlogLoding] = useState(true);

  useEffect(() => {
    setBlogLoding(true);
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setBlogList(response.data);
        setBlogLoding(false);
      })
      .catch((error) => {
        console.log(error.message);
        setBlogLoding(false);
      });
  }, []);

  return (
    <div>
      <h2 className="blog-list-title">Blog List</h2>
      {(blogLoding) ?
        <div> Loading.... </div>
        :
        <ul className="blog-list">
          {blogList.map((blogListItem) => {
            return (
              <li className="blog-list-item blog-list-item-color" key={blogListItem.id}>
                <Link to={`/blogs/${blogListItem.id}`}> {blogListItem.id}.  {blogListItem.title}</Link>
              </li>
            );
          })}
        </ul>}
    </div>
  );
};

export default BlogList;
