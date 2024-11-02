import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { connect } from 'react-redux'
import { signIn } from '../../Action/AuthAction'

import { useNavigate } from 'react-router-dom'
import InputTextFieldComponent from '../common/InputTextFieldComponent'


function Login(props) {
    let navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate("/")
        }
    }, [props.auth.isAuthenticated])

    const onChangeLogin = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        }
        )
    }

    const onSubmits = (e) => {
        e.preventDefault();
        const user = {
            email: state.email,
            password: state.password
        }

        props.signIn(user);
    }
    const error = props.errorRed?.error;
    return (
        <div className='container mt-5 login-container'>
            <div className='back-down row justify-content-md-center mt-5' >
                <div className='login-box-outer   col col-sm-11 col-md-8 col-lg-6 '>

                   
                    <div className='login-box'
                        style={{ backgroundColor: "white"}}
                    >
                        <form
                            style={{ background: "transparent" 
                            ,fontFamily:"monospace"
                            }}
                        >

                            <div className="form-group"
                                style={{ backgroundColor: "white", color: "black"  }}
                            >
                                <label htmlFor="exampleInputEmail1"
                                    style={{ backgroundColor: "white", color: "black" }}
                                >Email address</label>
                                <InputTextFieldComponent
                                    type="email" 
                                    className="inputLogin form-control" 
                                    id="exampleInputEmail1" 
                                    areaDescribedBy="emailHelp" 
                                    placeholder="Enter email"
                                    name="email" 
                                    value={state.email} 
                                    onChange={onChangeLogin}
                                    error={error.email}
                                   
                                />
                                <small id="emailHelp" className="form-text text-muted"
                                    style={{ backgroundColor: "white" }}
                                >We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group"
                                style={{ backgroundColor: "white", color: "black" }}
                            >
                                <label htmlFor="exampleInputPassword1"
                                    style={{ backgroundColor: "white", color: "black" }}
                                >Password</label>
                                <InputTextFieldComponent
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    name="password" 
                                    value={state.password} 
                                    onChange={onChangeLogin} 
                                    placeholder="Password"
                                    error={error.password}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary"
                                onClick={onSubmits}
                                
            
                            >LOGIN</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authRed,
    errorRed: state.errorReducer
})

export default connect(mapStateToProps, { signIn })(Login)
