import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { FaBars, FaRegBell, FaRegComments, FaSearch } from "react-icons/fa";

function HeaderHome() {
  return (
    <div className="header-home">
      <nav className="navbar navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars color="white" className="hamburger-icon"
          style={{color:"black"}}
          ></FaBars>
        </button>

        <Link to="/" className="navbar-brand" 
        
        style={{ fontSize: "30px" , color:"black" }}>
          CodeCrisp
        </Link>
        <div
          style={{
            background: "transparent",
          }}
        >
    
        </div>
        
        
        
        <div
          className="collapse navbar-collapse
                "
          id="navbarNavAltMarkup"
          style={{ backgroundColor: "white" 
         
          }}
        >
          <div className="navbar-nav">
            <a className="nav-item nav-link nav-options" href="#"
            style={{background:"transparent" ,color:"black" , 
            fontWeight:"500" , fontFamily:"inherit" , fontSize:"20px"
            
            }}
            >
              About Us<span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="#"
             style={{background:"transparent" ,color:"black" , 
             fontWeight:"500" , fontFamily:"inherit" , fontSize:"20px"
             
             }}
            >
              Features
            </a>
            <Link to="/developers" className="nav-item nav-link" href="#"
           style={{background:"transparent" ,color:"black" , 
           fontWeight:"500" , fontFamily:"inherit" , fontSize:"20px"
           
           }}
            >
              Developer
            </Link>
            <a className="nav-item nav-link" href="#"
             style={{background:"transparent" ,color:"black" , 
             fontWeight:"500" , fontFamily:"inherit" , fontSize:"20px"
             
             }}
            >
              ContactUs
            </a>
          </div>
        </div>
        
        {/* SignUp */}
        
         <Link to="/signup">
            <button type="button" className="btn btn-primary mx-2"
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
              SIGNUP
            </button>
          </Link>

      </nav>
    </div>
  );
}

export default HeaderHome;
