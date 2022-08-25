import React from 'react'
import '../Discuss/Discuss.css'
import Header from '../Header'
function Discuss() {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className='row p-5'>


                    {["Web Development", "Machine Learning", "General Discussion", "Artificial Intellegence", "Java", "Python"].map(e => (
                        <div className='col-sm-12 col-md-6 col-lg-4 mx-auto'>
                            <div class="card card-discuss my-4" >
                                <div class="card-body card-body-discuss">
                                    <h5 class="card-title">{e}</h5>
                                </div>
                            </div>   </div>))}

                </div>



            </div>
        </div>
    )
}

export default Discuss
