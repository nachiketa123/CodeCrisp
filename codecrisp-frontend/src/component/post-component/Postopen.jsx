import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { postData } from "../../Action/PostAction";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import "./Postopen.css";
import { margin } from "@mui/system";
function Postopen({ postRed, postData, authRed }) {
  console.log(postRed.currentPost.name);
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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:"10px",
      
      }}
      
      className='comment-openbox'
    >
      <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop:"20px"
          
          }}
      >
       <img src='' />
      </div>
      <div
      style={{display:"flex",
      flexDirection:"column",
      alignItems:"center"
      }}
      >
        <div class="container mt-3">
          <div class="d-flex justify-content-center row">
          
        
            <div class="col-md-8 col-sm-12">
            
           
              <div class="d-flex flex-column comment-section">
              {postRed.currentPost.comments?.map((e) => (
              
              <div className='m-1'
             
              >
                  <div class="bg-white p-2" >
                  
                    <div class="d-flex flex-row user-info">
                    
                      <img class="rounded-circle" src={e.avatar} width="40" />
                      <div class="d-flex flex-column justify-content-start ml-2">
                        <span class="d-block font-weight-bold name">
                          {e.name}
                        </span>
                        <span class="date text-black-50">Date</span>
                      </div>
                    </div>

                    <div class="mt-2">
                      <p class="comment-text">{e.text}</p>
                    </div>
                  </div>
              
                        <div class="bg-white">
                          <div class="d-flex flex-row fs-12">
                            <div class="like p-2 cursor">
                              <i class="fa fa-thumbs-o-up"></i>
                              <span class="ml-1">Like</span>
                            </div>
                            <div class="like p-2 cursor">
                              <i class="fa fa-commenting-o"></i>
                              <span class="ml-1">Comment</span>
                            </div>
                            <div class="like p-2 cursor">
                              <i class="fa fa-share"></i>
                              <span class="ml-1">Share</span>
                            </div>
                          </div>
                        </div>
                        </div>
                ))}
           
                <div class="bg-light p-2">
                  <div class="d-flex flex-row align-items-start">
                    <img
                      class="rounded-circle"
                      src={authRed.user.avatar}
                      width="40"
                    />
                    <textarea class="form-control ml-1 shadow-none textarea"></textarea>
                  </div>
                  <div class="mt-2 text-right">
                    <button
                      class="btn btn-primary btn-sm shadow-none"
                      type="button"
                    >
                      Post comment
                    </button>
                    <button
                      class="btn btn-outline-primary btn-sm ml-1 shadow-none"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                
                
              </div>
              
              
              
            </div>
          </div>
        </div>
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
