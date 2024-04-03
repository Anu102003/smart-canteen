import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./singleProduct.scss"
import { SizeChart } from '../Popup/SizeChart/SizeChart';
export const SingleProduct = () => {
    const location = useLocation();
    const product = location?.state?.details
    const [imgSelect, setImgSelect] = useState(product.thumbnail)
    const [buyEnabled, setBuyEnabled] = useState(false)
    const [openSizeChart, setOpenSizeChart] = useState(false);
    const sizeChart = () => {
        setOpenSizeChart(true)
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "size-popup-parent") {
                setOpenSizeChart(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "buy-popup-parent") {
                setBuyEnabled(false)
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    const handleCart = () => {
        let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
        if (!Array.isArray(cart)) {
            cart = [];
        }
        cart = cart.filter((e) => e.id !== product.id);
        cart.push(product);
        window.localStorage.setItem('cart', JSON.stringify(cart));
        setOpenSizeChart(true)
    }
    const combinedData = {
        ...product,
        quantity:1,
        value:product.price
    }
    console.log(combinedData)
    return (
        <>
            <div className='single-product'>
                <div className='d-1'>
                    <div className='d-11'>
                        <div className='image-lists'>
                            <section className='scrollmenu'>
                                <div className={`product-img ${imgSelect === product.thumbnail && "active"}`}
                                    onClick={() => { setImgSelect(product.thumbnail) }}>
                                    <img src={product.thumbnail} />
                                </div>
                                {product.images.map((img) => (
                                    <div className={`product-img ${imgSelect === img.url && "active"}`}
                                        onClick={() => { setImgSelect(img.url) }}>
                                        <img src={img.url} />
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                    <div className='d-12'>
                        <div className='p-img'>
                            <img src={imgSelect} />
                        </div>
                    </div>
                </div>
                <div className='d-2'>
                    <div className='btn'>
                        <button className='cart-btn' onClick={handleCart}>Add to cart</button>
                        <button className='buy-btn' onClick={()=>{setBuyEnabled(true)}}>Buy Now</button>
                    </div>
                    <div className='details'>
                        <p className='brand'> {product.name}</p>

                        <p className='discount-price'>
                            {/* <span className='discount'>{product.price.discount}%</span> */}
                            <span className="rupee"></span> {product.price}
                        </p>


                    </div>
                </div>
                {
                    openSizeChart &&
                    <div className='size-popup-parent'>
                        <SizeChart setChart={setOpenSizeChart} cart={true} />
                    </div>
                }
                {
                    buyEnabled &&
                    <div className='buy-popup-parent'>
                        <SizeChart data={combinedData} setChart={setBuyEnabled} totalPrice={product.price} />
                    </div>
                }
            </div>
        </>
    );
};


