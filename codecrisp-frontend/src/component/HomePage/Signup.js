import React,{ useState} from 'react'
// import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../Action/AuthAction'

function Signup(props) {


    // const navigate = useNavigate();

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
        setState({
            name: "",
            email: "",
            phoneNo: "",
            age: "",
            password: ""

        },
        )


    }

    return (
        <div className='container'>
            <div className='back-down row justify-content-md-center'>
                <div className='login-box-outer  col col-sm-12 col-md-8 col-lg-6'>

                    <h1>SignUp</h1>
                    <div className='login-box'>
                        <form>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name"
                                    name="name" value={state.name} onChange={handleOnchange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Email</label>
                                <input type="email" className="form-control" id="exampleInputPassword1" placeholder="email"
                                    name="email" value={state.email} onChange={handleOnchange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">phone no</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Phone Number"
                                    name="phoneNo" value={state.phoneNo} onChange={handleOnchange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Age</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Age"
                                    name="age" value={state.age} onChange={handleOnchange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="passwords" className="form-control" id="exampleInputPassword1" placeholder="password"
                                    name="password" value={state.password} onChange={handleOnchange}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary"
                                onClick={onSubmit}
                            >SignUp</button>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authRed
})
export default connect(mapStateToProps, { signUp })(Signup)

