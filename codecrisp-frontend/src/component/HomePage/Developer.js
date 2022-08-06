import React from 'react'

function Developer() {
    return (
        <div className='container  developersTile'>
            <h1>Developers</h1>
            <div className='row justify-content-md-center my-1'>

                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>

                    <div class="card">
                        <img src={require('../../assets/images/ayush.jpg')}
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Ayush Kumar</h5>
                            <p class="card-text">
                                Full Stack Developer |  Worked on both Frontend & Backend
                            </p>
                            <a href="#" class="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>

                </div>
                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>

                    <div class="card">
                        <img src={require('../../assets/images/nach_profile.jpg')}
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Nachiketa Rajput</h5>
                            <p class="card-text">
                                Full Stack Developer |  Worked on both Frontend & Backend
                            </p>
                            <a href="#" class="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>

                </div>

                <div className='col col-sm-12 col-md-4 col-lg-3 p-0 m-3 developerTile'>
                    <div class="card">
                        <img src={require('../../assets/images/luv_profile.jpg')}
                            class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Luv Saini</h5>
                            <p class="card-text">
                                Full Stack Developer |  Worked on both Frontend & Backend
                            </p>
                            <a href="#" class="btn btn-primary">LinkedIn Profile</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Developer
