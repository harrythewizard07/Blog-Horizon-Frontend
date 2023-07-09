import React from "react";
import { Button, Container } from "reactstrap";
import Base from "./Base";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Base>
      <Container
        style={{backgroundColor: "#fafafa", padding: "6% 8% 6% 8%", marginTop: "80px" }}
        className="rounded shadow "
        
      >
        <div className="jumbotron mt-5 p-4">
          <div className="display-1 mb-2">Welcome to BlogHorizon!</div>
          <div className="lead">
            Welcome to BlogHorizon, a blogging application which meets all your
            needs as an aspiring blogger. Start blogging today!
          </div>
          <hr className="my-4" />
          <Button outline color="success" size="lg" className="mb-4" tag={Link} to="/signup">
            Sign Up
          </Button>
        </div>
      </Container>
    </Base>
  );
};

export default LandingPage;