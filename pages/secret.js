import React, { useContext } from "react";
import { Context } from "../context/authContext";
import Link from "next/link";
import GifGallery from "./Gifgallery";

const SecretPage = () => {
  const { state } = useContext(Context);

  const pageStyles = {
    textAlign: "center",
    padding: "2rem",
  };

  const headingStyles = {
    fontSize: "2rem",
    color: "#333",
  };

  const paragraphStyles = {
    fontSize: "1.2rem",
    color: "#777",
    marginTop: "1rem",
  };

  const loginLinkStyles = {
    color: "#00bcd4",
    textDecoration: "none",
    fontWeight: "bold",
  };

  if (!state.user) {
    return (
      <div style={pageStyles}>
        <h1 style={headingStyles}>Access Denied</h1>
        <p style={paragraphStyles}>
          Please{" "}
          <Link href="/login">
            <a style={loginLinkStyles}>login</a>
          </Link>{" "}
          to access this page.
        </p>
      </div>
    );
  }

  return (
    <div style={pageStyles}>
      <GifGallery />
    </div>
  );
};

export default SecretPage;


