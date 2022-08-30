import React from 'react'
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import isEmpty from '../../utility/is-empty';
import { Link } from 'react-router-dom';


function SearchResultBox({ search: { user } }) {

    return (
        <div className='container search-container'>

            <div className='row search-box'>
                <div className='col col-sm-10 col-md-6 col-lg-4 p-0'>


                    <ul className="list-group list-group-flush">
                        { (!isEmpty(user)) ? user.map(e => (<li key={e._id} className="list-group-item">
                            
                            {e.avatar   ? <img className='image-search'
                                        src={e.avatar}
                                        alt="search_image" />
                                        :(<FaUserAlt size="30" className='image-search'/>)}
                            <Link className='search-user-name' to={`/userProfile/${e._id}`}>{e.name}</Link>
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




