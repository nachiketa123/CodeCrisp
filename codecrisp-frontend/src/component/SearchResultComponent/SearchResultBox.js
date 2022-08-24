import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import isEmpty from '../../utility/is-empty';



function SearchResultBox({ search: { user } }) {

    return (
        <div className='container search-container'>

            <div className='row search-box'>
                <div className='col col-sm-10 col-md-6 col-lg-4 p-0'>


                    <ul className="list-group list-group-flush">
                        { (!isEmpty(user)) ? user.map(e => (<li key={e._id} className="list-group-item"><img

                            className='image-search'
                            src={require('../../assets/images/luv_profile.jpg')}
                            alt="search_image" />
                            <a className='search-user-name' href='#'>{e.name}</a>
                            <FaSearch color='grey' className="search-icon" title='search' />
                        </li>)) : ""
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    search: state.searchRed
})

export default connect(mapStateToProps)(SearchResultBox)




