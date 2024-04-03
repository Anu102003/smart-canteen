

import React, { useState } from 'react';
import "./_mainPage.scss"
import { NavbarPopup } from '../../../assets/components/NavbarPopup/NavbarPopup';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar'
import Menu from '../../../Context/LocaleContext';

export const MainPage = () => {
    const [navPopup, setNavPopup] = useState(false)
    const [navMenuSelected, setNavMenuSelected] = useState("Snacks")

    return (
        <>
            <div className='homepage'>
                <NavBar navPopup={navPopup} setNavPopup={setNavPopup} navMenuSelected={navMenuSelected} setNavMenuSelected={setNavMenuSelected} />
                {
                    navPopup &&
                    <NavbarPopup setNavPopup={setNavPopup} type="User" />
                }
                <div className='outlet-container' style={{marginTop:navPopup?0:"6rem"}}>
                    <Menu.Provider value={navMenuSelected}>
                        <Outlet />
                    </Menu.Provider>
                </div>
            </div>

        </>
    );
}
