import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  loginResult,
  postsResultsError,
  photosResultsError,
} from "../../redux/selectors";

import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

export default () => {
  const authStatus = !!localStorage.getItem("auth");
  const userName = localStorage.getItem("name");
  const [isLoggedIn, setIsLoggedIn] = useState(authStatus);
  const response = useSelector((state) => loginResult(state));
  const postsError = useSelector((state) => postsResultsError(state));
  const photosError = useSelector((state) => photosResultsError(state));

  useEffect(() => {
    if (response && !response.error) {
      setIsLoggedIn(true);
    } else if (check401()) {
      logout();
      return;
    }
  }, [response, postsError, photosError]);

  const check401 = () => {
    return (
      (postsError && postsError.status === 401) ||
      (photosError && photosError.status === 401)
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    isLoggedIn && (
      <Navbar bg="primary" fixed="top" variant="dark">
        <Navbar.Brand href="/posts">React</Navbar.Brand>
        <Nav>
          <Nav.Link href="/posts">Posts</Nav.Link>
          <Nav.Link href="/photos">Photos</Nav.Link>
          <span className="username">{userName}</span>
          <Nav.Link href="/login" className="logout" onClick={logout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
    )
  );
};
