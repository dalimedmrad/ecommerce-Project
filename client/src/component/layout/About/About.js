import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import instagram from "../../../images/instagram.png";
import github from "../../../images/github.svg";
import facebook from "../../../images/facebook.png";
const About = () => {
  const visitInstagram = () => {
    window.location = "";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dqpumjvx1/image/upload/v1646476338/products/wsfzcc0aqkylyoqxix9y.jpg"
              alt="Founder"
            />
            {/* <Typography>aaaaa</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button> */}
            <span>
              This is a Commercial Website made by me, for the purpose of
              commercialising the products of E-Commerce company.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <img className="social" src={instagram} alt="instagram" />
            <a>Instagram</a>
            <img className="social" src={facebook} alt="facebook" />
            <a>Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
