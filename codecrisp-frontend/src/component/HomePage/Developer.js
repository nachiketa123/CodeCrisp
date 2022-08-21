import React from 'react'

function Developer() {
    return (
        <div className='container developersTile'>
            <h1>Developers</h1>
            <div className='row mx-auto'>

                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>

                    <div className="card">
                        <img src={require('../../assets/images/ayush.jpg')}
                            className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Ayush Kumar</h5>
                            <p className="card-text">
                                Full Stack Developer |  Worked on both Frontend & Backend
                            </p>
                            <a href="#" className="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>

                </div>
                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>

                    <div className="card">
                        <img src={require('../../assets/images/nach_profile.jpg')}
                            className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Nachiketa Rajput</h5>
                            <p className="card-text">
                                Full Stack Developer |  Worked on both Frontend & Backend
                            </p>
                            <a href="#" className="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>

                </div>

                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>
                    <div className="card">
                        <img src={require('../../assets/images/luv_profile.jpg')}
                            className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Luv Saini</h5>
                            <p className="card-text">
                                Database || Mongo || SQL Developer
                            </p>
                            <a href="#" className="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Developer
