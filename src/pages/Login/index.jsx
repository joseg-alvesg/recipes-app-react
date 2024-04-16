import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import validator from "validator";
import { setUser } from "../../util/localStorageHelper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  const validatePassword = (password) => {
    return password.length > 6;
  };

  const handleSubmit = () => {
    setUser("email", email);
    history.push("/meals");
  };

  return (
    <div
      className="
      h-100 w-100 d-flex align-items-center 
      justify-content-center flex-column"
    >
      <div
        className="h-50 w-50 d-flex align-items-center flex-column
        justify-content-center border border-2 rounded-3 shadow-lg"
      >
        <div className="text-center">
          <img src="cooking.png" alt="logo" className="w-25" />
        </div>
        <Form className="w-75">
          <div className="form-outline mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="jhon@gmail.com"
              data-testid="email-input"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              className="form-control"
              placeholder="********"
              onChange={(e) => handleChange(e)}
              value={password}
              autoComplete="on"
            />
          </div>

          <button
            type="button"
            data-testid="login-submit-btn"
            className="btn btn-primary btn-lg w-100"
            disabled={!validateEmail(email) || !validatePassword(password)}
            onClick={handleSubmit}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
