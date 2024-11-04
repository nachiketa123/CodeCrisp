import React, { useState } from 'react';
import {connect} from 'react-redux';
import './DeleteAccount.css';
import getClassNames from '../../utility/getClassNames';
import { IoCloseOutline } from "react-icons/io5";
import {deleteAccount} from "../../Action/AuthAction";

const DeleteAccount = ({auth,deleteAccount}) =>{
    const [showModal,setShowModal] = useState(false);
    const [identifier,setIdentifier] = useState("");

    const handleToggleModal = (modalState) =>{
        setShowModal(modalState);
    }
    const handleOnChange = (e) =>{
        setIdentifier(e.target.value)
    }

    const handleDeleteAccountConfirm = (e) => {
        e.preventDefault();
        const userEmail = auth.user.email;
        deleteAccount(userEmail);
    }

    //utility function to check if the identifier is equal to the user.email
    const checkIfIdentifierMatch = () =>{
        return identifier.toLowerCase() === auth.user.email.toString().toLowerCase();
    }
    return (
        <div className='container delete-account'>
            <span>Note that this is an irreversible action and will cause you to loose all the data, If you want to proceed then</span>
            <button type="button" className="btn btn-primary btn-sm ml-2" 
                data-bs-toggle="modal" data-bs-target="#deleteAccountModal"
                onClick={()=>handleToggleModal(true)}
            >
            Click here!
            </button>
            <div className={getClassNames({dc:"modal fade",cc:"show"},showModal)} tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-2" id="deleteAccountModalLabel">
                        In order to confirm, Please type the identifier provided below
                    </h1>
                    <IoCloseOutline cursor="pointer" size={50} onClick={()=>handleToggleModal(false)}/>
                </div>
                <div className="modal-body">
                <div className="input-group flex-nowrap">
                    {/* <div className="d-flex flex-column"> */}
                        {/* <span className=''>Identifier:</span> */}
                        <input placeholder={auth.user.email} disabled={true} type="text" className="form-control"  aria-describedby="addon-wrapping"
                        />
                    {/* </div> */}
                    <span className={"input-group-text text-white " + 
                        getClassNames({dc:"bg-danger",cc:"bg-success"},checkIfIdentifierMatch(),true)} 
                        id="addon-wrapping">=</span>
                    <input placeholder='Type the same identifier here' type="text" className="form-control" name='identifier' value={identifier}
                    onChange={e=>handleOnChange(e)}/>
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={()=>handleToggleModal(false)}>Close</button>
                    <button type="button" disabled={!checkIfIdentifierMatch()} 
                    className="btn btn-primary"
                    onClick={handleDeleteAccountConfirm}>Submit</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authRed
})

export default connect(mapStateToProps,{deleteAccount})(DeleteAccount);
