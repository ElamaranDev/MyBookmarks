import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { logout } from "../slices/authSlice.js";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
    console.log("menu clicked");
  };

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="nav-bar">
        <div className="nav-bar-left">
          <div className="brand-logo">
            <NavLink id="logo-text" to={"/"}>
              My<span id="bookmark-logo-text">Bookmarks</span>
            </NavLink>
          </div>
          <div
            onClick={() => {
              handleMenu();
            }}
            className="menu-bar"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`nav-bar-right ${isOpen ? "" : "nav-close"}`}>
          <ul className="nav-links">
            {userInfo ? (
              <>
                <NavDropdown
                  className="custom-nav-dropdown"
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item className="text-dark custom-dropdown-item">
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={"/logout"}>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="text-dark custom-dropdown-item"
                    >
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink className="header-nav-link" to={"/login"}>
                  <li className="sign-in-link">
                    <a id="sign-in-btn">Sign In</a>
                  </li>
                </NavLink>
                <NavLink className="header-nav-link" to={"/register"}>
                  <li className="sign-out-link">
                    <a id="sign-up-btn">Sign Up</a>
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
