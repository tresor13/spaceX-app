import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../authContext.js";

/* LoginForm is a modal form, user can insert registered email and password and login
or go to Registration page via link  */

function LoginForm() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header ">
          <h5 className="modal-title" id="loginModalLabel">
            Login or
          </h5>
          <button
            type="button"
            className="btn btn-outline-info mx-2"
            data-bs-dismiss="modal"
          >
            <Link to={`/register`} className="nav-link" role={"button"}>
              Register
            </Link>
          </button>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3 row">
            <label for="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                value={email}
                type="email"
                className="form-control"
                id="inputEmail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label for="inputPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                value={pass}
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={() => login(email, pass)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
