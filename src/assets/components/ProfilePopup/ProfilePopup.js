import React, { useEffect, useState } from 'react'
import "./profilePopup.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { profileApi } from '../../../actions/ApiCalls'
import { useSelector } from 'react-redux';

export const ProfilePopup = ({ setProfilePopup }) => {
    const { email } = useSelector(state => state.user);
    const [details, setDetails] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await profileApi(email.email)
                console.log(result)
                setDetails(result);
            } catch (error) {
                console.error("Error in fetching profile details:", error);
            }
        };
        fetchData();
    }, [email]);
    return (
        <div className='profile-popup'>
            <div className='close-icon' onClick={() => { console.log("ttt", false); setProfilePopup(false) }}>
                <FontAwesomeIcon icon={faClose} size='2xl' />
            </div>
            <div>
                <h2>Profile</h2>
                <h3>Name : </h3>
                <h3>Email : </h3>
            </div>
        </div>
    )
}
