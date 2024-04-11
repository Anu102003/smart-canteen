import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { LoginPage } from '../pages/SignUpInPage/SignIn'
import { MainPage } from '../pages/User/Mainpage/MainPage'
import { ListAllProducts } from '../pages/User/ListAllProducts/ListAllProducts'
import { AdminPage } from '../pages/Admin/AdminPage/AdminPage'
import { Products } from '../pages/Admin/Products/Products'
import { Orders } from '../pages/Admin/Orders/Orders'
import { SingleProduct } from '../assets/components/SingleProduct/SingleProduct'
import { Cart } from '../pages/User/Cart/Cart'
import { useSelector } from 'react-redux'
import { SingleOrders } from '../pages/User/Orders/SingleOrders'

export const Router = () => {
    const { email, authenticated } = useSelector(state => state.user);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        // if (email.email === "e20itr007@egspec.org") {
        if (email.email === "a@gmail.com") {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [email])
    // console.log(admin, "Admin")
    // console.log(authenticated, "authen")
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={!authenticated ? <LoginPage /> : admin ? <Navigate to="/products" /> : <Navigate to="/snacks" />} />
                    <Route path="/" element={(authenticated && !admin) ? <MainPage /> : <Navigate to="/signin" />} >
                        <Route path="/juice" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route index path="/snacks" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/meals" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/product" element={(authenticated && !admin) ? <SingleProduct /> : <Navigate to="/signin" />} />
                    </Route>

                    <Route path="/cart" element={(authenticated && !admin) ? <Cart /> : <Navigate to="/signin" />} />
                    <Route path="/order" element={(authenticated && !admin) ? <SingleOrders/> : <Navigate to="/signin" />} />

                    <Route path="/" element={(authenticated && admin) ? <AdminPage /> : <Navigate to="/signin" />} >
                        <Route index element={(authenticated && admin) ? <Products /> : <Navigate to="/signin" />} />
                        <Route path="/products" element={(authenticated && admin) ? <Products /> : <Navigate to="/signin" />} />
                        <Route path="/orders" element={(authenticated && admin) ? <Orders /> : <Navigate to="/signin" />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
