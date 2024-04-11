import React, { useEffect, useState } from 'react'
import "./singleOrders.scss"
import { NavBar } from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../../actions/ApiCalls';
import { useSelector } from 'react-redux';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderTable } from '../../../assets/components/OrderTable/OrderTable';

export const SingleOrders = () => {
  const { email } = useSelector(state => state.user);
  const [details, setDetails] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await orderApi(email.email)
        console.log(result)
        setDetails(result);
      } catch (error) {
        console.error("Error in fetching order details:", error);
      }
    };
    fetchData();
  }, [email]);
  return (
    <div className='singleOrders-page'>
      <NavBar cart={true} />
      {
        details?.length > 0 ?
          <div className='order-contents'>
            <OrderTable orderData={details}/>
          </div>
          :
          <div className='no-orders-contents'>
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#a30b00", }} size="4x" />
            <h2>No items available in orders</h2>
          </div>
      }
    </div>
  )
}
