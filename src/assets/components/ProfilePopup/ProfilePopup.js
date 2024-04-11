import React, { useEffect, useState } from 'react'
import "./profilePopup.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faClose } from '@fortawesome/free-solid-svg-icons'
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
            <div className='details-container'>
                <h2> <FontAwesomeIcon icon={faCircleUser} size='2x'/>
                Profile</h2>
                <h3 className='details-head'>Name : <span className='details'>{details?.userName}</span></h3>
                <h3 className='details-head'>Email : <span className='details'>{details?.userEmailId}</span></h3>
                <h3 className='details-head'>Phone number : <span className='details'>{details?.userPhoneNumber}</span></h3>
                <h3 className='details-head'>Date Of Birth : <span className='details'>{details?.dateOfBirth.split("-").reverse().join("-")}</span></h3>
            </div>
        </div>
    )
}
