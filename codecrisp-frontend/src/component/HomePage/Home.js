import React from "react";
import Login from "./Login";
import "./Home.css";
import { Stack } from "@mui/material";
import { fontFamily } from "@mui/system";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="background-homePage">
      {/* Left */}
      <div className="homePage-left">
        <h3
          style={{
            color: "purple",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          NEW PLATFORM
        </h3>

        <h1
          style={{
            color: "black",
            fontWeight: "bolder",
            content: "initial",
            fontFamily: "sans-serif",
            fontSize: "70px",
          }}
        >
          Your Next Social Life
        </h1>

        <p
          style={{
            color: "black",
            fontWeight: "bolder",
            content: "initial",
          }}
        >
          {" "}
          Your new Social Media Platform with stuff that actually matters.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
        
        <Link  to="/login">
      
          <button
            style={{
              background: "transparent",
              padding: "10px 15px",
              borderRadius: "2em",
              backgroundColor: "#ad42ff",
              color: "white",
              fontWeight: "700",
              fontFamily: "monospace",
              cursor: "pointer",
            }}
          >
            LOGIN
          </button>
          </Link>
        </div>
      </div>

      <div className="homePage-right">
        <img src={require("../../assets/images/homepageImage.png")} 
        style={{
             height:"60vh"
        }}
        />
      </div>
    </div>
  );
}

export default Home;
