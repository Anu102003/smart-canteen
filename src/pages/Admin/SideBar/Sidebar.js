import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { basic } from '../../../images';
import "./_sidebar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faRightFromBracket, } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = ({ sidePopup, setSidePopup }) => {
    const Products = "Products"
    const Orders = "Orders"

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    const handleLogout = () => {
        dispatch(logout());
        navigate("/signin")
    };


    const pathname = location.pathname;
    const [sideMenuSelected, setSideMenuSelected] = useState()

    const handleRedirect = menu => {
        navigate(`/${menu.toLowerCase()}`);
    };

    useEffect(() => {
        if (pathname === '/products') setSideMenuSelected(Products)
        if (pathname === '/orders') setSideMenuSelected(Orders)
    }, [pathname])


    return (
        <>
            <div className='sidebar'>

                <div className='sidebar__logo' onClick={() => { handleRedirect(Products) }}>
                    <img src={basic.logoWhite} />
                </div>
                <div className='sidebar__menu'>
                  
                    <div className={`content ${sideMenuSelected === Products && "active"}`} onClick={() => { handleRedirect(Products) }}>Products
                    </div>
                    <div className={`content ${sideMenuSelected === Orders && "active"}`} onClick={() => { handleRedirect(Orders) }}>Orders
                    </div>
                   
                </div>
            </div>


            <div className='sidebar-left'>
                <div className='search-logout-container'>

                    {/* <div className='search'>
                        <input type='text' placeholder='Search' />
                        <div className='search-icon'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
                        </div>
                    </div> */}

                    <div className='profile-logout-wrapper'>
                        <div className="logout-btn" onClick={handleLogout}>
                            <div className='logout-icon'>
                                <FontAwesomeIcon icon={faRightFromBracket} color='white' />
                            </div>
                            <button>Logout</button>
                        </div>

                    </div>

                    <div className='more-icon-wrapper' onClick={() => { setSidePopup(!sidePopup) }}>
                        <FontAwesomeIcon className='more-icon' size='xl' icon={faBars} />
                    </div>
                </div>
            </div>
        </>
    )
}