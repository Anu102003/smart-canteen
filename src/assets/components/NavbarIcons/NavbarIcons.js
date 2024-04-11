import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpWideShort, faClose, faUser as faUserSoild } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./_navbarIcons.scss"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProfilePopup } from '../ProfilePopup/ProfilePopup';
export const NavbarIcons = () => {
    const profile = 'profile'
    const orders = 'orders'
    const cart = 'cart'
    const navigate = useNavigate()
    const [profilepopup, setProfilePopup] = useState(false)

    const [iconHovered, setIconHovered] = useState({
        profile: false,
        orders: false,
        cart: false
    });

    const handleIconHover = (key, isHovered) => {
        setIconHovered(prevValue => ({
            ...prevValue,
            [key]: isHovered
        }));
    };
    const handleCart = () => {
        navigate("/cart")
    }
    const handleOrders = () => {
        navigate("/order")
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "profile-popup-parent") {
                setProfilePopup(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    return (
        <div className='icon'>
            <div className='icon__cart'
                onMouseEnter={() => handleIconHover(cart, true)}
                onMouseLeave={() => handleIconHover(cart, false)}
                onClick={handleCart}
            >
                <FontAwesomeIcon icon={faShoppingCart} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.cart && 'purple' }}>Cart</span>
            </div>
            <div className='icon__profile'
                onClick={() => setProfilePopup(true)}
            >
                <FontAwesomeIcon icon={iconHovered.profile ? faUserSoild : faUser} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.profile && 'purple' }}>Profile</span>
            </div>
            {
                profilepopup &&
                <div className='profile-popup-parent'>
                    <ProfilePopup setProfilePopup={setProfilePopup} />
                </div>
            }

            <div className='icon__orders'
                onMouseEnter={() => handleIconHover(orders, true)}
                onMouseLeave={() => handleIconHover(orders, false)}
                onClick={handleOrders}
            >
                <FontAwesomeIcon icon={faArrowUpWideShort} color={"purple"} />
                <span className='icon-txt' style={{ color: iconHovered.orders && 'purple' }}>Orders</span>

            </div>


        </div>
    )
}
