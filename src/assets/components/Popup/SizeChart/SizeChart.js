import React, { useEffect, useState } from 'react'
import "./sizeChart.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { addOrderApi } from '../../../../actions/ApiCalls'
import { useSelector } from 'react-redux';

export const SizeChart = ({ data, setChart, cart, totalPrice }) => {
    
    const [paymentPopup, setPaymentPopup] = useState(false)
    const [paymentId, setPaymentId] = useState("")
    const navigate = useNavigate()
    const { email } = useSelector(state => state.user);
    const handlePay = () => {
        var options = {
            key: "rzp_test_7XD7UUKbea9zSO",
            key_secret: "YRPWiuBKgS3Fs8ge6ja7raL1",
            amount: totalPrice * 100,
            currency: "INR",
            name: "Food Order",
            description: "for testing",
            handler: function (response) {
                setPaymentId(response.razorpay_payment_id)
                setPaymentPopup(true)
            },
            prefill: {
                name: "Anu",
                email: "anu@gmail.com",
                contact: "1234567890"
            },
            notes: {
                address: "cbe"
            },
            theme: {
                color: "#3399cc"
            }
        }
        var pay = new window.Razorpay(options)
        pay.open()
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "payment-popup-parent") {
                setChart(false)
                setPaymentPopup(false)
                setPaymentId("")
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    const orderDetails={
        orderId:4,
        userEmailId:email.email,
        orderProductEntityList:data,
        paymentId:paymentId,
    }
    console.log(totalPrice)

    useEffect(() => {
        const handleSubmit = async () => {
            if (paymentId.length > 0) {
                try {
                    const result=await addOrderApi(orderDetails)
                    console.log(result)
                    localStorage.removeItem('total');
                    localStorage.removeItem('cart');

                } catch (error) {
                    console.error('Error adding order: ', error);
                }
            }
        }
        handleSubmit()
    }, [paymentId])
    const handleOk = () => {
        setChart(false);
        setPaymentPopup(false);
        setPaymentId("")
        navigate("/snacks")
    }
    return (
        <div className='size-popup'>
            {
                cart ?
                    <div className='cart-popup'>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#0c9715", }} size='6x' />
                        <h3 className='head'>Added to Cart Successfully</h3>
                        <button className="ok-btn" onClick={() => { setChart(false) }}>Ok</button>
                    </div> :
                    <>
                        {
                            !paymentPopup &&
                            <div className='pay-popup'>
                                <div className='close-icon' onClick={() => { setChart(false) }}>
                                    <FontAwesomeIcon icon={faClose} size='2xl' />
                                </div>
                                <h3 className='head'>Proceed to Pay : {totalPrice}</h3>
                                <button className='pay-btn' onClick={handlePay}>Pay</button>
                            </div>
                        }
                    </>
            }
            {
                paymentPopup &&
                <div className='payment-popup'>
                    <h3 className='head'>Payment Successful!</h3>
                    <p>Your payment was successful. Thank you for your purchase!</p>
                    <h4>{paymentId}</h4>
                    <button className="ok-btn" onClick={handleOk}>Ok</button>
                </div>
            }
        </div>
    )
}
