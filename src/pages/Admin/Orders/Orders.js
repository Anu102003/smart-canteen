import React, { useEffect, useState } from 'react'
import { getAllOrdersApi } from '../../../actions/ApiCalls';
import { OrderTable } from '../../../assets/components/OrderTable/OrderTable';

export const Orders = () => {
  const [orderData, setOrderData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result=await getAllOrdersApi();
        console.log(result)
        setOrderData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(orderData)
  return (
    <OrderTable orderData={orderData} order={true}/>
  )
}
