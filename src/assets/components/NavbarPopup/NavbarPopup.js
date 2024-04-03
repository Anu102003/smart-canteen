import React from 'react'
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCookieBite, faMortarPestle, faShoppingCart,faWineGlass, faArrowUpWideShort, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import "./_navbarPopup.scss"
import { useNavigate } from 'react-router-dom'
export const NavbarPopup = ({ setNavPopup, type }) => {
    const navigate = useNavigate()
    const handleRedirect = (menu) => {
        console.log(menu)
        if (menu === "Snacks") {
            navigate("/snacks")
            setNavPopup(false)
        }
        if (menu === "Juice") {
            navigate("/juice")
            setNavPopup(false)
        }
        if (menu === "Meals") {
            navigate("/meals")
            setNavPopup(false)
        }
       
        if (menu === "Products") {
            navigate("/products")
            setNavPopup(false)
        }
        if (menu === "Orders") {
            navigate("/orders")
            setNavPopup(false)
        }
        if (menu === "Cart") {
            navigate("/cart")
            setNavPopup(false)
        }
    }
    return (
        <div className='popup-navbar'>
            <div className='menu-icons-container'
            style={{marginTop:type === "User" ?"6rem":"0"}}>

                <div className='menu'>
                    {
                        type === "User" ?
                            <>
                                <p className='content' onClick={() => { handleRedirect("Snacks") }}>
                                    <FontAwesomeIcon icon={faCookieBite} className='icon-style' />
                                    Snacks
                                </p>
                                <p className='content' onClick={() => { handleRedirect("Juice") }}>
                                    <FontAwesomeIcon icon={faWineGlass} className='icon-style' />
                                    Juice</p>
                                <p className='content' onClick={() => { handleRedirect("Meals") }}>
                                    <FontAwesomeIcon icon={faMortarPestle} className='icon-style' />
                                    Meals</p>
                                <p className='content'>
                                    <FontAwesomeIcon icon={faUser} className='icon-style' />
                                    Profile</p>
                                <p className='content' onClick={() => { handleRedirect("Cart") }}>
                                    <FontAwesomeIcon icon={faShoppingCart} className='icon-style' />Cart</p>
                            </> :
                            <>
                                <p className='content' onClick={() => { handleRedirect("Products") }}>
                                    <FontAwesomeIcon icon={faCircleInfo} className='icon-style' />
                                    Products</p>
                                <p className='content' onClick={() => { handleRedirect("Orders") }}>
                                    <FontAwesomeIcon icon={faArrowUpWideShort} className='icon-style' />
                                    Orders</p>
                            </>
                    }
                </div>

            </div>
        </div>
    )
}
