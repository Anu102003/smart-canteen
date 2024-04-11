import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./singleProduct.scss"
import { SizeChart } from '../Popup/SizeChart/SizeChart';
import { getSingleProductApi } from '../../../actions/ApiCalls';
export const SingleProduct = () => {
    const location = useLocation();
    const product = location?.state?.details
    const [details, setDetails] = useState()
    const [imgSelect, setImgSelect] = useState(details ? details.thumbnailImage : null);

    useEffect(() => {
        if (details && details.thumbnailImage) {
            setImgSelect(details.thumbnailImage);
        }
    }, [details]);

    const [buyEnabled, setBuyEnabled] = useState(false)
    const [openSizeChart, setOpenSizeChart] = useState(false);
    const sizeChart = () => {
        setOpenSizeChart(true)
    }
    useEffect(() => {
        if (product > 0) {
            const fetchData = async () => {
                try {
                    const result = await getSingleProductApi(product)
                    console.log(result)
                    setDetails(result);
                } catch (error) {
                    console.error("Error fetching single product:", error);
                }
            };
            fetchData();
        }
    }, [product]);
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
        cart = cart.filter((e) => e.productId !== details.productId);
        cart.push(details);
        window.localStorage.setItem('cart', JSON.stringify(cart));
        setOpenSizeChart(true)
    }
    const combinedData = [{
        ...details,
        productCount: 1,
        value: details?.productPrice
    }]
    return (
        <>
            <div className='single-product'>
                <div className='d-1'>
                    <div className='d-11'>
                        <div className='image-lists'>
                            <section className='scrollmenu'>
                                <div className={`product-img ${imgSelect === details?.thumbnailImage && "active"}`}
                                    onClick={() => { setImgSelect(details?.thumbnailImage) }}>
                                    <img src={details?.thumbnailImage} />
                                </div>
                                {
                                    details?.firstImageLink &&
                                    <div className={`product-img ${imgSelect === details?.firstImageLink && "active"}`}
                                        onClick={() => { setImgSelect(details?.firstImageLink) }}>
                                        <img src={details?.firstImageLink} />
                                    </div>
                                }
                                {
                                    details?.secondImageLink &&
                                    <div className={`product-img ${imgSelect === details?.secondImageLink && "active"}`}
                                        onClick={() => { setImgSelect(details?.secondImageLink) }}>
                                        <img src={details?.secondImageLink} />
                                    </div>
                                }
                                {
                                    details?.thirdImageLink &&
                                    <div className={`product-img ${imgSelect === details?.thirdImageLink && "active"}`}
                                        onClick={() => { setImgSelect(details?.thirdImageLink) }}>
                                        <img src={details?.thirdImageLink} />
                                    </div>
                                }
                            </section>
                        </div>
                    </div>
                    <div className='d-12'>
                        <div className='p-img'>
                            <img src={imgSelect} alt="image not given"/>
                        </div>
                    </div>
                </div>
                <div className='d-2'>
                    <div className='btn'>
                        <button className='cart-btn' onClick={handleCart}>Add to cart</button>
                        <button className='buy-btn' onClick={() => { setBuyEnabled(true) }}>Buy Now</button>
                    </div>
                    <div className='details'>
                        <p className='brand'> {details?.productName}</p>

                        <p className='discount-price'>
                            <span className="rupee"></span> {details?.productPrice}
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
                        <SizeChart data={combinedData} setChart={setBuyEnabled} totalPrice={details.productPrice} />
                    </div>
                }
            </div>
        </>
    );
};


