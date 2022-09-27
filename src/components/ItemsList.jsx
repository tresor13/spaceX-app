import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  navItem: {
    width: "30em",
    height: "8em",
    overflow: "hidden",
  },
  imgOverlayText: { top: "0.5em" },
  iconImg: { objectFit: "cover" },
};
const homeIcon =
  "https://img.freepik.com/premium-photo/milky-way-galaxy-with-stars-and-space-dust-in-the-universe_33900-3.jpg?w=2000";

function ItemsList() {
  const { ids, entities } = useSelector((state) => state.rocketsReducer);
  const previewPictures = ids.map((id) => entities[id].images[0]); //index 0 - just to pick first url in array of urls

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
      </ul>
    </nav>
  );
}
export default ItemsList;
