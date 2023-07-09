import React, { useContext, useEffect, useState } from "react";
import Base from "../components/Base";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { getPostById } from "../services/post-service";
import { toast } from "react-toastify";
import { createComment } from "../services/comment-service";
import { getCurrentUserDetail } from "../auth/auth";
import { UserContext } from "../context/userContext";
import { getCategoryById } from "../services/category-service";

const PostPage = () => {

  const userContextData = useContext(UserContext);

  const { postId } = useParams();

  const [post, setPost] = useState([]);

  const [category, setCategory] = useState([]);

  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    //getting posts by post id
    getPostById(postId)
      .then((data) => {
        //console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error encountered while loading post!");
      });
  }, [postId]);

  useEffect(() => {
    //getting category by post id
    if (post.categoryId !== undefined) {
      getCategoryById(post.categoryId)
      .then((data) => {
        //console.log(data);
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error encountered while loading post category!");
      });
    }
  },[post.categoryId])

  //field changed function
  const fieldChanged = (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });
  };

  const submitComment = () => {

    //not allowing empty comment
    if(comment.body.trim() === '') {
      toast.error("Write something in the comment section !!")
      return
    }

    createComment(comment, postId)
      .then((data) => {
        //console.log(data);
        toast.success("New comment added !!");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          name: "",
          email: "",
          body: "",
        });
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401) {
          toast.error("Login to post a comment!");
        }
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/blogs">Home</Link> / {post && <Link to=""> {post.title} </Link>}
        <Row className="mt-3">
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3 mb-5 ps-2 border-0 shadow">
              {post.user && category.name && (
                <CardBody>
                  <CardText>
                    {" "}
                    Posted By <b>{post.user.name}</b>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#00695c",
                    }}
                  />
                  <CardText className="mb-0 display-3">{post.title}</CardText>
                  <CardText className="font-italic">
                    <i>{post.description}</i>
                  </CardText>
                  <CardText
                    className="mt-4 mb-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#00695c",
                    }}
                  />
                  <CardText className="mt-2">
                    {" "}
                    Category :{" "}
                    <i>
                      {/* <b>Insert category</b> */}
                      <b>{category.name}</b>
                    </i>
                  </CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col
            md={{
              size: 10,
              offset: 1,
            }}
          >
            {post.comments && (
              <h3 className="mb-4">
                Comments ({post ? post.comments.length : 0}){" "}
              </h3>
            )}

            {post.comments &&
              post.comments.map((comment, index) => (
                <Card className="mt-2 border-0 shadow" key={index}>
                  <CardBody>
                    <CardText className="mb-0">
                      <b>{comment.name}</b>
                    </CardText>
                    <CardText className="mt-0">
                      <i style={{ fontSize: "12px" }}>{comment.email}</i>
                    </CardText>
                    <CardText>{comment.body}</CardText>
                  </CardBody>
                </Card>
              ))}

            <Card className="mt-2 mb-4 border-0 shadow">
              <CardBody>
                {/* {JSON.stringify(comment)} */}
                <Input
                  className="my-2"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={ userContextData.user.login ? comment.name = getCurrentUserDetail().name : comment.name }
                  onChange={fieldChanged}
                />
                <Input
                  className="my-2"
                  type="email"
                  placeholder="Enter your email id"
                  name="email"
                  value={ userContextData.user.login ? comment.email = getCurrentUserDetail().email : comment.email }
                  onChange={fieldChanged}
                />
                <Input
                  className="my-2"
                  type="textarea"
                  placeholder="Comment here"
                  name="body"
                  value={comment.body}
                  onChange={fieldChanged}
                />
                <Button className="mt-2" onClick={submitComment}>
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
