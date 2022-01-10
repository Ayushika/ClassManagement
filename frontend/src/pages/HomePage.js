import React from "react";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import home from "../images/home.svg";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      <Meta title="Home" />

      <div className="container page">
        <div className="info">
          <h1>
            Class <span style={{ color: "#02b875" }}>Management</span> app
          </h1>
          <p style={{ color: "hsl(210, 22%, 49%)" }}>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link
            to={
              userInfo && userInfo.role
                ? `/${userInfo.role.toLowerCase()}/dashboard`
                : "/login"
            }
            className="btn btn-success"
          >
            {userInfo && userInfo.role
              ? `Hey ${userInfo.name}`
              : "Login to acess your account"}
          </Link>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <img src={home} alt="home" className="home-img" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
