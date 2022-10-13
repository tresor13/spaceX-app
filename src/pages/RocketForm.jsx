import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import Slider from "../components/Slider.jsx";
import useRequestDragons from "../hooks/useRequestDragons";

const RocketForm = () => {
  const { id } = useParams();
  const { fetchDragon } = useRequestDragons();
  const rocket = useSelector((state) => state.rocketsReducer.entities[id]);

  useEffect(() => {
    fetchDragon(id);
  }, [id, fetchDragon]);

  return !rocket ? null : (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col></Col>
        <Col xs={9}>
          <Card style={{ margin: "10px 0px" }}>
            <Card.Body style={{ padding: "0px 0px 20px 0px" }}>
              <Slider urls={rocket.images}></Slider>
              <Card.Title
                style={{
                  marginTop: "15px",
                  paddingBottom: "20px",
                  fontSize: "30px",
                  borderBottom: "1px solid #ced4da",
                }}
              >
                {rocket.name}
              </Card.Title>
              <br></br>
              <section className="specification d-flex justify-content-around">
                <div className="mass">
                  <h4 className="fs-6 text-muted">Dry mass:</h4>
                  <p className="fs-3">{rocket.mass_kg} kg</p>
                </div>
                <div className="mass">
                  <h4 className="fs-6 text-muted">Height:</h4>
                  <p className="fs-3">{rocket.height_m} m</p>
                </div>
                <div className="mass">
                  <h4 className="fs-6 text-muted">First flight:</h4>
                  <p className="fs-3">{rocket.first_flight}</p>
                </div>
              </section>
              <Card.Text
                style={{
                  padding: "20px 30px",
                  fontSize: "20px",
                  borderTop: "1px solid #ced4da",
                  marginBottom: "0px",
                }}
              >
                {rocket.description}
              </Card.Text>
              <a
                className="btn btn-outline-primary"
                href={rocket.wikipedia}
                role="button"
              >
                More info...
              </a>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default RocketForm;
