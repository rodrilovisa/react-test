import React from "react";
import { Redirect, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./style.css";

const Card = ({ type, id, title, text, thumbnailUrl, url }) => {
  const { state } = useLocation();
  const { from } = state || { from: { pathname: `/${type}/${id}` } };
  return (
    <Container>
      <div className="card-container">
        <Row>
          {thumbnailUrl && (
            <Col md={3} className="img-container">
              <Image src={thumbnailUrl} />
            </Col>
          )}
          <Col className="text-container">
            <Row className="title">
              <h1>
                {id} - {title}
              </h1>
            </Row>
            <Row className="text">
              <p>{text}</p>
            </Row>
            <Row className="button">
              <Link type="Button" to={`/${type}/${id}`}>
                View More
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Card;
