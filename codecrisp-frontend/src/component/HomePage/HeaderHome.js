import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { FaBars, FaRegBell, FaRegComments, FaSearch } from "react-icons/fa";

function HeaderHome() {
  return (
    <div className="header-home">
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars color="white" className="hamburger-icon"></FaBars>
        </button>

        <Link to="/" className="navbar-brand">
          CodeCrisp
        </Link>
        <div className="login-signup-btn-container"
          style={{
            background: "transparent",
          }}
        >
          <Link to="/login">
            <button type="button" className="btn btn-primary mx-2">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button type="button" className="btn btn-primary mx-2">
              SignUp
            </button>
          </Link>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ background: "transparent" }}
        >
          <div className="navbar-nav">
            <a className="nav-item nav-link nav-options" href="#">
              About&nbsp;Us<span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="#">
              Features
            </a>
            <Link to="/developers" className="nav-item nav-link" href="#">
              Developer
            </Link>
            <a className="nav-item nav-link" href="#">
              Contact&nbsp;Us
            </a>
          </div>
        </div>

      </nav>
    </div>
  );
}

export default HeaderHome;
