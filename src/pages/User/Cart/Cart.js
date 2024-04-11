import React, { useEffect, useState } from 'react'
import "./cart.scss"
import { NavBar } from '../NavBar/NavBar'
import { CartItem } from '../../../assets/components/Quantity/CartItem';
import { SizeChart } from '../../../assets/components/Popup/SizeChart/SizeChart';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [incrementClick, setIncrementClick] = useState(false);
    const [decrementClick, setDecrementClick] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const [buyEnabled, setBuyEnabled] = useState(false)
    useEffect(() => {
        const cartDataFromStorage = JSON.parse(window.localStorage.getItem('cart'));
        setCartData(cartDataFromStorage || []);
    }, [deleteClick]);

    useEffect(() => {
        const totalFromStorage = JSON.parse(window.localStorage.getItem('total'));
        setTotal(totalFromStorage || []);
    }, [incrementClick, decrementClick, deleteClick,cartData]);

    useEffect(() => {
        const sum = total.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
        setTotalPrice(sum);
    }, [incrementClick, decrementClick, total, deleteClick]);
    useEffect(() => {
        const updatedCombinedData = cartData.map(cartItem => {
            const totalItem = total.find(totalItem => totalItem?.id === cartItem?.productId);
            return {
                ...cartItem,
                ...totalItem
            };
        });
        setCombinedData(updatedCombinedData);
    }, [cartData,total]);

    useEffect(() => {
        function handle(e) {
            if (e.target.className === "buy-popup-parent") {
                setBuyEnabled(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    // useEffect(() => {
    //     const total = JSON.parse(window.localStorage.getItem('total'));
    //     const sum = total?.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    //     setTotalPrice(sum);
    // }, [incrementClick, decrementClick]);

    // let total = JSON.parse(window.localStorage.getItem('total')) || [];
    // const combinedData = cartData?.map(cartItem => {
    //     const totalItem = total?.find(totalItem => totalItem?.id === cartItem?.id);
    //     return {
    //         ...cartItem,
    //         ...totalItem
    //     };
    // });
    return (
        <div className='cart-page'>
            <NavBar cart={true} />
            {
                cartData !== null && cartData.length > 0 ?
                    <>
                        <div className='cart-contents'>
                            {
                                cartData?.map((data) =>
                                (
                                    <CartItem data={data} setDeleteClick={setDeleteClick} deleteClick={deleteClick} setDecrementClick={setDecrementClick} decrementClick={decrementClick} incrementClick={incrementClick} setIncrementClick={setIncrementClick} />
                                )
                                )
                            }
                            {
                                cartData.length > 0 &&
                                <div className='buy-container'>
                                    <h3>Total Price :{totalPrice} </h3>
                                    <button className='buy-btn' onClick={() => setBuyEnabled(true)}>Buy Now</button>
                                </div>
                            }
                        </div>
                        {
                            buyEnabled &&
                            <div className='buy-popup-parent'>
                                <SizeChart data={combinedData} setChart={setBuyEnabled} totalPrice={totalPrice} />
                            </div>
                        }
                    </> :

                    <div className='no-cart-contents'>
                        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#a30b00", }} size="4x" />
                        <h2>No items added to cart</h2>
                    </div>
            }
        </div>
    )
}
