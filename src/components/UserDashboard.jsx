import React, { useEffect, useState } from "react";
import Base from "./Base";
import AddPost from "./AddPost";
import { Container } from "reactstrap";
import { getPostByUserId } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "./Post";
import { getCurrentUserDetail } from "../auth/auth";

const UserDashboard = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //getting posts by user id
    getPostByUserId(getCurrentUserDetail().id)
      .then((data) => {
        //console.log(data);
        setPosts([...data].reverse());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading user posts !!");
      });
  }, []);

  return (
    <Base>
      <Container>
        <div className="h1 mt-4">Hi, { getCurrentUserDetail() && getCurrentUserDetail().name}. This is your Dashboard !!</div>
        <AddPost />
        <div className="h1 my-3">Your Posts : ({posts.length})</div>
        {posts && posts.map((post,index) => {
          return (
            <Post post={post} key={index} />
          )
        })}
        {posts.length <= 0 ? <div className="card shadow-sm display-4 text-center mt-3 mb-5 pt-2 py-3">You don't have any blog posts !!</div> : ''}
      </Container>
    </Base>
  );
};

export default UserDashboard;
