import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/post-service";
import { Row, Col } from "reactstrap";
import Post from "./Post";

const BlogPost = () => {
  const [postContent, setPostContent] = useState([]);

  useEffect(() => {
    //loading all the posts from the server
    getAllPosts()
      .then((data) => {
        //console.log(data);
        setPostContent([...data].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log(postContent);

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <h1 className="mb-2">Featured Blogs!</h1>
          <div
            className="divider"
            style={{
              width: "100%",
              height: "3px",
              background: "#00695c",
            }}
          />
          {postContent.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default BlogPost;
