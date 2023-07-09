import React, { useEffect, useState } from "react";
import Base from "./Base";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/user-service";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import UserProfile from "./UserProfile";

const ProfileInfo = () => {

  const { userId } = useParams();
  // console.log(userId);

  const[user,setUser] = useState([])

  useEffect(() => {
    getUserById(userId).then(data => {
      //console.log(data);
      setUser({...data})
    }).catch(error => {
      console.log(error);
      toast.error("Error in loading user data !!")
    })
  },[userId])

  const userView = () => {
    return(
      <Row>
        <Col md={{size: 6, offset: 3}}>
          <UserProfile user={user} />
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {userView()}
    </Base>
  );
};

export default ProfileInfo;
