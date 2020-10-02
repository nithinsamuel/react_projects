import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Payments from "./Payments";
const Header = (props) => {
  const renderContent = () => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        //we are returning the element as an array
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={{margin:'0 10px'}}>
            Credits:{props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };
  // console.log("header-props",props)
  return (
    <nav>
      <div className="nav-wrapper">
        {/*if the user is signed in navigate to the surveys route else to the landing page route  */}
        <Link to={props.auth ? "/surveys" : "/"} className="brand-logo">
          Emaily
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
};
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
