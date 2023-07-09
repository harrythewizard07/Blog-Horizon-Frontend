import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail } from "../auth/auth";
import { deletePostService } from "../services/post-service";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Post = ({ post }) => {

  const userContextData = useContext(UserContext)
  
  const deletePost = () => {
    //deleting a post belonging to a user
    deletePostService(post.id).then(response => {
      console.log(response);
      //toast.success("Post deleted successfully!")
      window.location.reload();
      
    }).catch((error) => {
      console.log(error);
      toast.error("Error in deleting post")
    })
  }

  return (
    <Card className="border-0 shadow mt-4 mb-4">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText>{post.description}</CardText>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 60) + "...",
          }}
        ></CardText>
        <div>
          <Link className="btn btn-secondary" to={"/posts/" + post.id}>
            Read More
          </Link>

          {userContextData.user.login ? getCurrentUserDetail() && getCurrentUserDetail().roles[0].name === "ROLE_ADMIN" ? <Button className="ms-2" color="danger" onClick={deletePost}>Delete</Button> : getCurrentUserDetail() && getCurrentUserDetail().id === post.user.id ? <Button className="ms-2" color="danger" onClick={deletePost}>Delete</Button> : '' : ''}

          {userContextData.user.login ? getCurrentUserDetail() && getCurrentUserDetail().id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.id}`} className="ms-2" color="primary" >Update</Button> : '' : ''}

        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
