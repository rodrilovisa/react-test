import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";

import { searchDetail } from "../../redux/actions";
import {
  detailResults,
  detailResultsError,
  isSearchDetailLoading,
} from "../../redux/selectors";
import "./style.css";

export default () => {
  const [isLooked, setIsLooked] = useState(false);
  const dispatch = useDispatch();
  const results = useSelector((state) => detailResults(state));
  const detailError = useSelector((state) => detailResultsError(state));
  const isLoading = useSelector((state) => isSearchDetailLoading(state));
  const location = useLocation();
  const url = location.pathname.substring(1);
  const type = location.pathname.substring(
    1,
    location.pathname.lastIndexOf("/")
  );
  const isPhoto = type == "photos";
  const isPost = type == "posts";

  useEffect(() => {
    if (!isLooked) {
      setIsLooked(true);
      dispatch(searchDetail({ url }));
    }
  });

  const renderDetail = () => {
    if (results) {
      if (results.id) {
        return (
          <Container>
            <Row className="detail-title">
              <Col md={12}>
                <h1>
                  {results.id} - {results.title}
                </h1>
              </Col>
            </Row>
            <Container className="detail-content">
              <Row className="justify-content-md-center">
                <Col md={12}>
                  {isPost && <p>{results.body}</p>}
                  {isPhoto && (
                    <Image className="img-detail" src={results.url} fluid />
                  )}
                </Col>
              </Row>
            </Container>
          </Container>
        );
      } else {
        return (
          <h1>
            We didn't find this {type == "posts" ? "post" : "photo"}. See the
            full list clicking <a href={`/${type}`}>here</a>
          </h1>
        );
      }
    } else if (detailError) {
      if (detailError.status === 401) {
        localStorage.clear();
        return <Redirect to={"/login"} />;
      } else {
        return <div>Ups! There is an error. Please Try Again.</div>;
      }
    } else if (isLoading) {
      return (
        <Row className="spinner-row">
          <Spinner animation="border" role="status" />
        </Row>
      );
    }
    return <div></div>;
  };

  return (
    <div>
      {" "}
      {results && (
        <Row className="page-header">
          <Col md={12}>
            <Link to={`/${type}`} className="go-back-button">
              Go back
            </Link>
          </Col>
        </Row>
      )}
      <Container>{renderDetail()}</Container>
    </div>
  );
};
