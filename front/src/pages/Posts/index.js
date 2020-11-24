import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { searchPosts } from "../../redux/actions";
import {
  postsResults,
  isSearchPostsLoading,
  postsResultsError,
} from "../../redux/selectors";
import PostCard from "../../components/Card";

export default () => {
  const [isLooked, setIsLooked] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => postsResults(state));
  const postsError = useSelector((state) => postsResultsError(state));
  const isLoading = useSelector((state) => isSearchPostsLoading(state));

  useEffect(() => {
    if (!isLooked) {
      setIsLooked(true);
      dispatch(searchPosts());
    }
  });

  const renderPosts = () => {
    if (posts && posts.length) {
      return posts.map((value, index) => {
        const data = {
          id: value.id,
          title: value.title,
          text: value.body,
        };
        return (
          <PostCard key={index} type="posts" {...data}>
            {value.title}
          </PostCard>
        );
      });
    } else if (postsError) {
      if (postsError.status === 401) {
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
      {posts && posts.length && (
        <Row className="page-header">
          <Col md={6}>
            <span className="results">Showing {posts.length} posts.</span>
          </Col>
        </Row>
      )}
      <Container>{renderPosts()}</Container>
    </div>
  );
};
