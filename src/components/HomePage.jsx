import React from "react";

function HomePage() {
  return (
    <div
      className="container-fluid d-flex flex-column mb-3 d-flex justify-content-start"
      style={{
        backgroundImage: `url("https://images5.alphacoders.com/102/thumb-1920-1020666.jpg")`,
        backgroundRepeat: "no-repeat",
        height: "980px",
        width: "auto",
        padding: "0",
      }}
    >
      <div
        className="card border border-white"
        style={{
          width: "35rem",
          backgroundColor: "rgba(117, 190, 218, 0)",
          margin: "30px 30px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title fs-2 badge bg-secondary text-wrap text-white fw-bold">
            Welcome to SpaceX
          </h5>
          <h6 className="card-subtitle mb-2 text-light text-opacity-50 ">
            {" "}
            Space Exploration Technologies Corporation
          </h6>
          <br />
          <p className="card-text text-white">
            SpaceX, in full Space Exploration Technologies Corporation, American
            aerospace company founded in 2002 that helped usher in the era of
            commercial spaceflight. Headquarters are in Hawthorne, California.
          </p>
          <br />
          <a
            className="btn btn-light"
            href="https://www.spacex.com/"
            role="button"
          >
            Learn more...
          </a>
        </div>
      </div>
      <blockquote
        className="blockquote d-inline-flex flex-column align-items-end pr-5"
        style={{ padding: "10px 30px" }}
      >
        <p className="mb-0 text-white fs-3 w-50" style={{ textAlign: "right" }}>
          People work better when they know what the goal is and why. It is
          important that people look forward to coming to work in the morning
          and enjoy working.
        </p>
        <br />
        <footer className="blockquote-footer text-light text-opacity-50 d-inline-block fs-4">
          Elon Musk in <cite title="Source Title">The Guardian</cite>
        </footer>
      </blockquote>
    </div>
  );
}

export default HomePage;
