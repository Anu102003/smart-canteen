import React, { useEffect, useState } from 'react'
import "./cartItem.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export const CartItem = ({ data, setDeleteClick,deleteClick,setIncrementClick, incrementClick, setDecrementClick, decrementClick }) => {
    const [count, setCount] = useState(1)
    const handleIncrement = () => {
        setCount(count + 1)
        setIncrementClick(!incrementClick)
    }
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1)
            setDecrementClick(!decrementClick)
        }
    }
    const totalValue = {
        value: count * data.productPrice,
        id: data.productId,
        productCount: count
    }
    useEffect(() => {
        let total = JSON.parse(window.localStorage.getItem('total')) || [];
        if (!Array.isArray(total)) {
            total = [];
        }
        total = total.filter((e) => e.id !== data.productId);
        total.push(totalValue);
        window.localStorage.setItem('total', JSON.stringify(total));
    }, [count])
    const handleClose = (value) => {
        let cart = JSON.parse(window.localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.productId !== value);
        let total = JSON.parse(window.localStorage.getItem('total')) || [];
        const updatedTotal = total.filter(item => item.id !== value);
        window.localStorage.setItem('total', JSON.stringify(updatedTotal));
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
        setDeleteClick(!deleteClick)
    }
    return (
        <>
            <div className='cart-items'>
                <div className='close-icon' onClick={()=>handleClose(data.productId)}>
                    <FontAwesomeIcon icon={faClose} size='xl' />
                </div>
                <div className='img'>
                    <img src={data.thumbnailImage} />
                </div>
                <div className='details'>
                    <p className='details__name'>{data.productName}</p>
                    <p className='details__price'> <span className="rupee"></span>  {data.productPrice}</p>
                    <div className='details__quantity'>Quantity :
                        <p onClick={handleDecrement} className={count === 1 ? 'disable' : 'btn'}>-</p>
                        {count}
                        <p onClick={handleIncrement} className='btn'>+</p>
                    </div>
                    <div>
                        <h4>Total : {count * data.productPrice} </h4>
                    </div>
                </div>
            </div>
        </>

    )
}
