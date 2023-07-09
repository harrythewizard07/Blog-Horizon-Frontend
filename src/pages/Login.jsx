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
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../services/user-service";
import { doLogin } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {

  const userContextData = useContext(UserContext);

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (event, field) => {
    let actualValue = event.target.value;

    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(loginDetail);

    //validation

    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password is required!");
      return;
    }

    //submitting the data to server to generate token
    login(loginDetail)
      .then((data) => {
        //console.log(data);

        //saving the data to localStorage
        doLogin(data, () => {
          console.log("Login detail is saved to local storage successfully!")

          //updating userContext

          userContextData.setUser({
            userData: data.user,
            login:true
          })

          //redirecting to user dashboard page

          navigate("/user/dashboard")

        })

        toast.success("User logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card outline color="dark">
              <CardHeader>
                <h3>Login Here!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  {/* Username field */}
                  <FormGroup>
                    <Label for="username">Enter Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter username here"
                      id="username"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>
                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Your Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password here"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Login</Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Login;
