import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";

const mainNaviagtion = (props) => {
  return (
    <>
      <AuthContext.Consumer>
        {(context) => {
          return (
            <header className="main-navigation">
              <div className="main-navigation_logo">
                <h1>AppointmentSchedular</h1>
              </div>
              <nav className="main-navigation_items">
                <ul>
                  {!context.email && (
                    <li>
                      <NavLink to="/auth">Authentication</NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/events">Events</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </ul>
              </nav>
            </header>
          );
        }}
      </AuthContext.Consumer>
    </>
  );
};

export default mainNaviagtion;
