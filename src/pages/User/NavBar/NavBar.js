import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { basic } from '../../../images';
import "./_navBar.scss"
import { NavbarIcons } from '../../../assets/components/NavbarIcons/NavbarIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faRightFromBracket, } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Config/ConfigFirebase';

export const NavBar = ({cart, navPopup, setNavPopup, navMenuSelected, setNavMenuSelected }) => {
    const Juice = "Juice"
    const Snacks = "Snacks"
    const Meals = "Meals"

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()


    const handleLogout = async() => {
        await signOut(auth)
        dispatch(logout());
        navigate("/signin")
    };


    const pathname = location.pathname;


    const handleRedirect = (menu) => {
        navigate(`/${menu.toLowerCase()}`);
        setNavMenuSelected(menu)
    };
    useEffect(() => {
        if (pathname === '/products')
            if (pathname === '/snacks') setNavMenuSelected(Snacks)
        if (pathname === '/meals') setNavMenuSelected(Meals)
        if (pathname === '/juice') setNavMenuSelected(Juice)
    }, [pathname])


    return (
        <div className={cart?'cart-navbar':'navbar'}>

            <div className='navbar__logo' onClick={() => { handleRedirect(Snacks) }}>
                <img src={basic.logo} />
            </div>

            {
                cart ? null :
                    <div className='navbar__contents'>


                        <div className='more-icon-wrapper' onClick={() => { setNavPopup(!navPopup) }}>
                            <FontAwesomeIcon className='more-icon' size='xl' icon={faBars} />
                        </div>


                        <div className='menu-icons-container'>

                            <div className='menu'>
                                <div className='content' onClick={() => { handleRedirect(Snacks) }}>Snacks
                                    <div className={navMenuSelected === Snacks && 'nav-menu-hr'}></div>
                                </div>
                                <div className='content' onClick={() => { handleRedirect(Juice) }}>Juice
                                    <div className={navMenuSelected === Juice && 'nav-menu-hr'}></div>
                                </div>
                                <div className='content' onClick={() => { handleRedirect(Meals) }}>Meals
                                    <div className={navMenuSelected === Meals && 'nav-menu-hr'}></div>
                                </div>
                            </div>
                            <NavbarIcons />

                        </div>


                    </div>
            }





            <div className="navbar__logout-btn" onClick={handleLogout}>
                <div className='logout-icon'>
                    <FontAwesomeIcon icon={faRightFromBracket} color='white' />
                </div>
                <button>Logout</button>
            </div>
        </div>
    )
}