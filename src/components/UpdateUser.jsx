import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { getUserById, updateUserService } from "../services/user-service";
import Base from "./Base";

const UpdateUser = () => {
  const { userId } = useParams();

  //console.log(userId);

  const navigate = useNavigate();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    //load the user by id from the database
    getUserById(userId)
      .then((data) => {
        setUser({ ...data });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the user details!");
      });
  }, [userId]);

  //console.log(user);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const updateUser = (event) => {
    event.preventDefault();

    updateUserService({ ...user }, user.id)
      .then((response) => {
        toast.success("Password changed successfully!");
        navigate("/user/dashboard");
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 400) {  
          toast.error(error.response.data.password);
        }

        //toast.error("Error in updating user details !!");
      });
  };

  const updateHtml = () => {
    return (
      <Row className="mt-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card outline color="dark">
            {/* {JSON.stringify(user)} */}
            <CardHeader>
              <h3>Change Password Here!</h3>
            </CardHeader>
            <CardBody>
              {/* Creating form */}
              <Form onSubmit={updateUser}>
                <FormGroup>
                  <Label for="password">Updated Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter a new password here"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="secondary">Submit</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Base>
      <Container>{user && updateHtml()}</Container>
    </Base>
  );
};

export default UpdateUser;
