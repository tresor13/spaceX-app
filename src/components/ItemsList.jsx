import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import registrationIcon from "../images/log-in.png";
import profileIcon from "../images/profile.png";
import LoginForm from "./LoginForm.jsx";

const styles = {
  navItem: {
    width: "30em",
    height: "6em",
    overflow: "hidden",
  },
  imgOverlayText: { top: "0.5em" },
  iconImg: { objectFit: "contain" },
  navBar: { padding: "0" },
};
const homeIcon =
  "https://img.freepik.com/premium-photo/milky-way-galaxy-with-stars-and-space-dust-in-the-universe_33900-3.jpg?w=2000";

function ItemsList() {
  const userState = useSelector((state) => state.userReducer);
  const { ids, entities } = useSelector((state) => state.rocketsReducer);
  const previewPictures = ids.map((id) => entities[id].images[0]); //index 0 - just to pick first url in array of urls

  const loginLink = (
    <li className="nav-item" style={{ width: "5em", margin: "0" }}>
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

  const profileLink = (
    <li className="nav-item" style={{ width: "5em", margin: "0" }}>
      <img
        type="button"
        src={profileIcon}
        class="rounded mx-auto d-block img-fluid"
        alt="profile"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
        data-keyboard="false"
        data-backdrop="static"
      />
    </li>
  );
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark "
      style={styles.navBar}
    >
      <ul className="container-fluid d-flex justify-content-around mb-0">
        <li className="nav-item" style={styles.navItem}>
          <Link to={`/`} className="nav-link" role={"button"}>
            <div className="card bg-dark text-white d-flex">
              <img
                src={homeIcon}
                className="card-img"
                alt="space"
                style={styles.iconImg}
              />
              <div
                className="card-img-overlay fs-2"
                style={styles.imgOverlayText}
              >
                Home
              </div>
            </div>
          </Link>
        </li>
        {ids.map((id, index) => {
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
                    src={previewPictures[index]}
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
        })}
        {userState.isAuthorised ? profileLink : loginLink}
      </ul>
    </nav>
  );
}
export default ItemsList;
