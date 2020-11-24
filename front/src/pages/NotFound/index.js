import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <p>Oops! Sorry, it seems like we can't find this page.</p>
    <Link to="/login">Go to Login</Link>
  </div>
);
