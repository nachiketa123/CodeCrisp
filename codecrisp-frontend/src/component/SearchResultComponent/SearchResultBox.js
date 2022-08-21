import React from 'react'
import { FaSearch } from 'react-icons/fa';
function SearchResultBox() {
    return (
        <div className='container search-container'>

            <div className='row search-box'>
                <div className='col col-sm-10 col-md-6 col-lg-4 p-0'>

                    <ul class="list-group list-group-flush">
                        {[1, 2, 3, 4, 5].map(e => (<li class="list-group-item"><img
                            className='image-search'
                            src={require('../../assets/images/luv_profile.jpg')} alt="search_image" /><a className='search-user-name' href='#'>Luv Saini</a><FaSearch color='grey' className="search-icon" title='search' />
                        </li>))}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchResultBox




