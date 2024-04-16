import React from "react";
import { Form } from "react-bootstrap";

export default function Login() {
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
            />
          </div>

          <button
            type="submit"
            data-testid="login-submit-btn"
            className="btn btn-primary btn-lg w-100"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
