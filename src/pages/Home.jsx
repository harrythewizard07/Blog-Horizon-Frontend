import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import BlogPost from "../components/BlogPost";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <Base>
      <Container className="mt-4">
        <Row>
          <Col md={2} className="pt-3">
            <CategoryMenu />
          </Col>
          <Col md={10}>
            <BlogPost />
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Home;
