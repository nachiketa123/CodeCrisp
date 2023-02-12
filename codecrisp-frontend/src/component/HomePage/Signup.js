import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../Action/AuthAction'
import InputTextFieldComponent from '../common/InputTextFieldComponent'
import isEmpty from '../../utility/is-empty'
import './HomePage.css'

function Signup(props) {


    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        phoneNo: "",
        age: "",
        password: ""

    },
    )

    const handleOnchange = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: state.name,
            email: state.email,
            phoneno: state.phoneNo,
            age: state.age,
            password: state.password
        }

        props.signUp(newUser);
        if(isEmpty(props.errorRed?.error)){
            navigate('/login')
        }

    }
    const error = props.errorRed?.error
    return (
        <div className='container mt-5 signup-container'>
            <div className='back-down row justify-content-md-center'>
                <div className='login-box-outer  col col-sm-12 col-md-8 col-lg-6'>

                    <h1>SignUp</h1>
                    <div className='login-box'>
                        <form>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <InputTextFieldComponent
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    areaDescribedBy="emailHelp" 
                                    placeholder="Enter Name"
                                    name="name" 
                                    value={state.name} 
                                    onChange={handleOnchange}
                                    error={error.name}
                                    
                                    
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <InputTextFieldComponent
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="email"
                                    name="email" 
                                    value={state.email} 
                                    onChange={handleOnchange}
                                    error={error.email}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneno">phone no</label>
                                <InputTextFieldComponent
                                    type="text" 
                                    className="form-control" 
                                    id="phoneno" 
                                    placeholder="Phone Number"
                                    name="phoneNo" 
                                    value={state.phoneNo} 
                                    onChange={handleOnchange}
                                    error={error.phoneno}
                                />
                
                            </div>

                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <InputTextFieldComponent
                                     type="text" 
                                     className="form-control" 
                                     id="age" 
                                     placeholder="Age"
                                     name="age" 
                                     value={state.age} 
                                     onChange={handleOnchange}
                                     error={error.age}
                                />
                            
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <InputTextFieldComponent
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="password"
                                    name="password" 
                                    value={state.password} 
                                    onChange={handleOnchange}
                                    infotext="Password must contain atleast one character from all the below 1. small letter, 2. capital letter, 3. 0-9 digit and an special character from (!,@,#,$,%,^,&)"
                                    error={error.password}
                                />
                            </div>

                        
                            <button type="submit" className="btn btn-primary"
                                onClick={onSubmit}
                            >SIGNUP</button>

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
export default connect(mapStateToProps, { signUp })(Signup)

