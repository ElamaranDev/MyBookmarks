import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="hero-container">
      <div className="card">
        <h1 id="hero-header">
          Secure Bookmark Manager Your Gateway to Organized Browsing
        </h1>
        <p id="hero-text">
          Ready to streamline your online experience? Dive into our Secure
          Bookmark Manager and keep your favorite websites at your fingertips.
          Stay organized, focused, and productive with our intuitive interface.
          Store, edit, delete, and search your bookmarks with ease. Whether it
          is work, study, or personal browsing, manage it all seamlessly with
          our Bookmark Manager. Start organizing your web today!
        </p>

        <div className="action-area">
          {userInfo ? (
            <NavLink className={"hero-btn-a"} to={"/bookmarks"}>
              <button className="hero-button-view-bookmark">
                View Bookmarks
              </button>
            </NavLink>
          ) : (
            <>
              <NavLink className={"hero-btn-a"} to={"/login"}>
                <button className="hero-button-sign-in">Sign In</button>
              </NavLink>
              <NavLink className={"hero-btn-a"} to={"/register"}>
                <button className="hero-button-sign-up">Sign Up</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
