import React from "react";
import { Link } from "react-router-dom";
const MenuBasedOnLogin = (isLoggedIn) => {
  return isLoggedIn ? (
    <div>
      <span>
        <Link to="/" className="headerColor">
          ProfilePage
        </Link>
      </span>
    </div>
  ) : (
    <div>
      <span>
        <Link to="/signin" className="headerColor">
          SignIn
        </Link>
      </span>
      &nbsp;&nbsp;
      <span>
        <Link to="/signup" className="headerColor">
          SignUp
        </Link>
      </span>
      &nbsp;&nbsp;
      <span>
        <Link to="/reset" className="headerColor">
          Reset
        </Link>
      </span>
    </div>
  );
};
export default MenuBasedOnLogin;
