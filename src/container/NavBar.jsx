import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import registrationIcon from "../images/log-in.png";
import profileIcon from "../images/profile.png";
import LoginForm from "../components/LoginForm.jsx";

const styles = {
  // navItem: {
  //   width: "30em",
  //   height: "6em",
  //   overflow: "hidden",
  // },
  imgOverlayText: { top: "0.5em" },
  iconImg: { objectFit: "contain" },
  navBar: { padding: "0" },
};

const homeIconPic =
  "https://img.freepik.com/premium-photo/milky-way-galaxy-with-stars-and-space-dust-in-the-universe_33900-3.jpg?w=2000";

/* NavBar consists of links to:
  1. HomePage
  2. Dragon Pages
  3. LoginForm or User Profile */

function NavBar() {
  const userState = useSelector((state) => state.userReducer);
  const { ids, entities } = useSelector((state) => state.rocketsReducer);

  if (ids.length === 0) {
    return null;
  }
  /* Index 0 - just to pick first url in array of urls
  if url doesn't exist preview picture will be replaced by homeIconPic
  previewPictures are needed to make a Link to dragons pages*/
  const previewPictures = ids.map((id) => entities[id].images[0]);

  /* The last link in the NavBar is a link to the Login form if the user is not logged in,
   or to the User Profile if the user is logged in. */
  const loginLink = (
    <li className="nav-item" id="login-profile-link">
      <img
        type="button"
        src={registrationIcon}
        class="rounded mx-auto d-block img-fluid"
        alt="login"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
        data-keyboard="false"
        data-backdrop="static"
      />

      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <LoginForm />
      </div>
    </li>
  );
  // style={{ width: "5em", margin: "0" }}
  const profileLink = (
    <li className="nav-item " id="login-profile-link">
      <Link to={`/profile`} className="nav-link" role={"button"}>
        <img
          type="button"
          src={profileIcon}
          class="rounded mx-auto d-block img-fluid"
          alt="profile"
        />
      </Link>
    </li>
  );

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark "
      style={styles.navBar}
    >
      <ul className="container-fluid d-flex justify-content-around mb-0">
        <li className="nav-item">
          <Link to={`/`} className="nav-link" role={"button"}>
            <div className="card bg-dark text-white d-flex">
              <img
                src={homeIconPic}
                className="card-img"
                alt="space"
                style={styles.iconImg}
              />
              <div
                className="card-img-overlay fs-2"
                style={styles.imgOverlayText}
                data-testid="home-link"
              >
                Home
              </div>
            </div>
          </Link>
        </li>

        {ids.length
          ? ids.map((id, index) => {
              return (
                <li className="nav-item" key={index} style={styles.navItem}>
                  <Link
                    key={index}
                    to={`/${id}`}
                    className="nav-link"
                    role={"button"}
                  >
                    <div className="card bg-dark text-white">
                      <img
                        src={previewPictures[index] ?? homeIconPic}
                        className="card-img"
                        alt="spaceCraft"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        className="card-img-overlay fs-2"
                        style={styles.imgOverlayText}
                      >
                        {entities[id].name}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          : null}

        {userState.isAuthorized ? profileLink : loginLink}
      </ul>
    </nav>
  );
}
export default NavBar;
