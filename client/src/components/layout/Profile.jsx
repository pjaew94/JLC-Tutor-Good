import React from 'react';
import PropTypes from 'prop-types';

import readingSvg from '../../svgs/readingSvg.svg';

import '../styles/Profile.scss';


const Profile = () => {
    return <div className='profile_container'>
        <div className='inner_container'>
            <img src={readingSvg} alt='readin guy' />
            <h1>Sorry about that! Content coming soon!</h1>
        </div>
    </div>
}

export default Profile