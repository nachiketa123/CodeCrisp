import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { postData } from "../../Action/PostAction";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import "./Postopen.css";
import { margin } from "@mui/system";
function Postopen({ postRed, postData, authRed }) {
  
  
  const location = useLocation();

  useEffect(
    (e) => {
      const pathname = location.pathname.toString().split("/").at(-1);
      postData(pathname);
    },
    [location]
  );

  return (
    <div
      className='comment-openbox'
    >
        <div>
          <img src={postRed.currentPost.imageUrls[0]} 
             style={{
                height:"50vh",
                width:"95%"
             }}
          /> 
        </div>
            <div
            className="comment-box-open"  
               style={{
                  backgroundColor:"yellow",
                  height:"50vh"
               }}
            >
            
            </div>
        <div>
           
        </div>
  
    </div>
  );
}

Postopen.propTypes = {
  postData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  postRed: state.postReducer,
  authRed: state.authRed,
});
export default connect(mapStateToProps, { postData })(Postopen);
