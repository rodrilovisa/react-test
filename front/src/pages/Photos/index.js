import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { searchPhotos } from "../../redux/actions";
import {
  photosResults,
  isSearchPhotosLoading,
  photosResultsError,
} from "../../redux/selectors";
import PhotoCard from "../../components/Card";
import Pagination from "../../components/Pagination";
import "./style.css";

export default () => {
  const [isLooked, setIsLooked] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); //HardCoded.. should be selectable by the user
  const dispatch = useDispatch();
  const results = useSelector((state) => photosResults(state));
  const photosError = useSelector((state) => photosResultsError(state));
  const isLoading = useSelector((state) => isSearchPhotosLoading(state));

  useEffect(() => {
    if (!isLooked) {
      setIsLooked(true);
      dispatch(searchPhotos({ page, pageSize }));
    }
  });

  const prevPageRef = useRef();
  const prevPage = prevPageRef.current;
  useEffect(() => {
    prevPageRef.current = page;
    if (page != prevPage) {
      setIsLooked(true);
      dispatch(searchPhotos({ page, pageSize }));
    }
  }, [page]);

  const renderPhotos = () => {
    if (results && results.photos && results.photos.length) {
      return results.photos.map((value, index) => (
        <PhotoCard key={index} type="photos" {...value}></PhotoCard>
      ));
    } else if (photosError) {
      if (photosError.status === 401) {
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

  const renderPagination = () => {
    if (results && results.photos && results.photos.length) {
      const paginationProps = {
        current: page,
        pageSize: pageSize,
        previous: results.previous,
        next: results.next,
        total: results.totalPages,
        updatePage,
      };
      const startIndex = (page - 1) * pageSize + 1;
      const endIndex =
        page * pageSize > results.totalResults
          ? results.totalResults
          : page * pageSize;
      return (
        <Row className="page-header">
          <Col md={6}>
            <span className="results">
              Showing {startIndex} to {endIndex} of {results.totalResults}{" "}
              photos:{" "}
            </span>
          </Col>
          <Col md={6}>
            <Pagination className="pagination" {...paginationProps} />
          </Col>
        </Row>
      );
    }
    return <div></div>;
  };

  const updatePage = (number) => {
    setPage(number);
  };

  return (
    <div>
      {renderPagination()}
      <Container>{renderPhotos()}</Container>
    </div>
  );
};
