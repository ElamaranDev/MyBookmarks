import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loader;
