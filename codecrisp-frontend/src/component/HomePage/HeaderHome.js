import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { connect } from "react-redux";
import { resetError } from "../../Action/ErrorAction";

function HeaderHome(props) {
  const location = useLocation();
  const navigate = useNavigate();

  //To toggle the button on the header for signup/login
  //if the path is /login use would like to see the button to goto signup and vice versa
  const [headerButtonToggler,setHeaderButtonToggler] = useState('signup')

  useEffect(()=>{
    const pathname = location.pathname.toString();
    if(pathname === '/signup')
      setHeaderButtonToggler('signup')
    else
      setHeaderButtonToggler('login')
  },[location])

  const navigateToLogin = () => {
    props.resetError()//reset action for error reducer
    navigate('/login')
  }

  const navigateToSignup = () => {
    props.resetError()//reset action for error reducer
    navigate('/signup')
  }

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
        <div className="login-signup-btn-container"
          style={{
            background: "transparent",
          }}
        >
    
        </div>
        
        
        
        <div
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          style={{ backgroundColor: "white" 
         ,justifyContent:"center"
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
        
        {/* SignUp Or Login Button */}
        {headerButtonToggler==='login'?
         (
            <button onClick={navigateToSignup} type="button" className="btn btn-primary mx-2"
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
              SIGN UP
            </button>
         ):(
          <button onClick={navigateToLogin} type="button" className="btn btn-primary mx-2"
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
       )}

      </nav>
    </div>
  );
}

const mapStateToProps = (state) =>({
  errorRed: state.errorReducer
})

export default connect(mapStateToProps, {resetError})(HeaderHome);
