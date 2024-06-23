import { Container, Row, Col } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center form-container">
        <Col xs={12} md={6} className="card p-5 w-100">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
