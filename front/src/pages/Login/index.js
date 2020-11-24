import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/actions/login";
import {
  loginResult,
  loginResultError,
  isLoginLoading,
} from "../../redux/selectors";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "./style.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(null);
  const response = useSelector((state) => loginResult(state));
  const loginError = useSelector((state) => loginResultError(state));
  const loginloading = useSelector((state) => isLoginLoading(state));
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    if (!username) {
      showErrorAlert("You should enter an username");
      return;
    } else if (!password) {
      showErrorAlert("You should enter a password");
      return;
    } else {
      const data = {
        username,
        password,
        shouldAuth: true,
      };
      dispatch(loginUserAction(data));
    }
  };

  useEffect(() => {
    if (response && response.data) {
      localStorage.setItem("auth", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      setRedirect(true);
    } else if (loginError) {
      showErrorAlert(loginError.data);
    }
    return <div></div>;
  }, [response, loginError]);

  const showErrorAlert = (text) => {
    setShowError(text);
    setTimeout(() => {
      setShowError(null);
    }, 3000);
  };

  if (redirect) {
    return <Redirect to={"/posts"} />;
  }

  return (
    <Container className="form-container">
      <form onSubmit={login}>
        <InputGroup className="mb-3">
          <FormControl
            value={username}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            value={password}
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Row>
          <Col sm={2}>
            <Button type="submit">
              Login
              {loginloading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </Button>
          </Col>
          <Col sm={6}>
            {showError && (
              <Alert variant={"danger"} dismissible>
                {showError}
              </Alert>
            )}
          </Col>
        </Row>
      </form>
    </Container>
  );
}
