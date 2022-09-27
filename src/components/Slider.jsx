import React from "react";
import { uniqueId } from "lodash";
import { Carousel } from "react-bootstrap";

const Slider = ({ urls }) => {
  return (
    <Carousel>
      {urls.map((url, i) => {
        return (
          <Carousel.Item style={{ height: "450px" }} key={i}>
            <img
              alt="spacecraft"
              className="d-block w-100 rounded"
              key={uniqueId()}
              src={url}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Slider;
