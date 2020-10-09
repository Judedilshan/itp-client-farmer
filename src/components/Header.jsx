import React from "react";
//import ReactDOM from "react-dom";
//import { Link, Router } from "react-router-dom";
import "../styles/header.css";
import Logo from "../images/logo.png";

class Header extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
          <img src={Logo} alt="Logo" className="logo" />
          <h2>Nevil Nutri Feeds (Pvt) Ltd</h2>

          {/* <Router>
          <div>
            <Link to="/">Sign Out</Link>
          </div>
        </Router> */}
        </header>
      </div>
    );
  }
}

export default Header;
