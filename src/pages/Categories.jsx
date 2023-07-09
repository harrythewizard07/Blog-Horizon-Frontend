import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategoryMenu from "../components/CategoryMenu";
import { getPostByCategory } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";

const Categories = () => {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //console.log(categoryId);
    getPostByCategory(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts !!");
      });
  }, [categoryId]);

  return (
    <Base>
      <Container className="mt-4">
        <Row>
          <Col md={2} className="pt-3">
            <CategoryMenu />
          </Col>
          <Col md={10}>
            <h1 className="mb-2">Featured Blogs!</h1>
            <div
              className="divider"
              style={{
                width: "100%",
                height: "3px",
                background: "#00695c",
              }}
            />
            {posts &&
              posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })}
            {posts.length <= 0 ? <div className="text-center mt-4 display-4">No Posts in this category !!</div> : ''}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Categories;
