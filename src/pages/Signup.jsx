import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState({
    errors: {},
    isError: false
  })

  const navigate = useNavigate();

  //handle change
  const handleChange = (event, field) => {

    //dynamic setting the values of each field
    setData({ ...data, [field]: event.target.value })
  }

  //resetting the form
  const resetData = () => {
    setData({
      name: '',
      username: '',
      email: '',
      password: ''
    })
  }

  //submitting the form
  const submitForm = (event) => {
    event.preventDefault();

    console.log(data);

    //validating data


    //calling server api for sending data
    signUp(data).then((resp) => {
      console.log(resp);
      console.log("success log");

      toast.success("User registered successfully!")

      setData({
        name: '',
        username: '',
        email: '',
        password: ''
      })
    }).catch((error) => {
      console.log(error);
      //console.log("Error log");

      if(error.response.status === 400) {
        toast.error(error.response.data.message);
      }

      //toast.error("Form data is invalid, please enter valid credentials!")

      //handle errors in proper way
      setError({
        errors: error,
        isError: true
      })
    })

    navigate("/login")
  }

  return (
    <Base>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card outline color="dark">
              <CardHeader>
                <h3>Register Here!</h3>
              </CardHeader>
              <CardBody>
                {/* Creating form */}

                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your name here"
                      id="name"
                      onChange={(e) => handleChange(e, 'name')}
                      value={data.name}
                      invalid={error.errors?.response?.data?.name ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  {/* Username field */}
                  <FormGroup>
                    <Label for="username">Enter Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter a valid username here"
                      id="username"
                      onChange={(e) => handleChange(e, 'username')}
                      value={data.username}
                      invalid={error.errors?.response?.data?.username ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.username}
                    </FormFeedback>
                  </FormGroup>
                  {/* Email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Eg: abc@xyz.com"
                      id="email"
                      onChange={(e) => handleChange(e, 'email')}
                      value={data.email}
                      invalid={error.errors?.response?.data?.email ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  {/* Password field */}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter a strong password here"
                      id="password"
                      onChange={(e) => handleChange(e, 'password')}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Register</Button>
                    <Button color="secondary" type="reset" className="ms-2" onClick={resetData}>
                      Reset
                    </Button>
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

export default Signup;
