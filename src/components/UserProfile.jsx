import React, { useContext } from "react";
import { Button, Card, CardBody, CardFooter, Container, Table } from "reactstrap";
import profilePic from "../profileimg.jpg";
import { UserContext } from "../context/userContext";
import { getCurrentUserDetail } from "../auth/auth";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {

  const userContextData = useContext(UserContext)

  return (
    <Card className="mt-5 shadow-sm">
      <CardBody>
        <h2 className="text-uppercase text-center mt-2 mb-4">
          <u>User Information</u>
        </h2>
        <Container className="text-center">
          <img
            style={{ width: "269px", height: "250px" }}
            src={profilePic}
            alt="profile-pic"
            className="img-fluid rounded-circle shadow-sm"
          />
        </Container>

        <Table bordered hover striped className="mt-5 text-center">
          <tbody>
            <tr>
              <td className="fw-bold">BlogHorizon ID</td>
              <td className="fst-italic">BH_UID-{user && user.id}</td>
            </tr>
            <tr>
              <td className="fw-bold">Name</td>
              <td className="fst-italic">{user && user.name}</td>
            </tr>
            <tr>
              <td className="fw-bold">Username</td>
              <td className="fst-italic">{user && user.username}</td>
            </tr>
            <tr>
              <td className="fw-bold">Email Id</td>
              <td className="fst-italic">{user && user.email}</td>
            </tr>
            <tr>
              <td className="fw-bold">Your Role</td>
              <td className="fst-italic">
                {user.roles &&
                  user.roles.map((role) => {
                    return <div key={role.id}>{role.name}</div>;
                  })}
              </td>
            </tr>
          </tbody>
        </Table>
        
        {userContextData.user.login ? getCurrentUserDetail() && getCurrentUserDetail().id === user.id ? (
          <CardFooter className="text-center border-0">
            <Button color="primary" tag={Link} to={`/user/update-user/${getCurrentUserDetail().id}`} >Change Password</Button>
          </CardFooter>
        ) : '' : ''}

      </CardBody>
    </Card>
  );
};

export default UserProfile;




