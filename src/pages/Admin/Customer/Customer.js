import React, { useEffect, useState } from 'react'
import { OrderTable } from '../../../assets/components/OrderTable/OrderTable'
import { getAllCustomerApi } from '../../../actions/ApiCalls';

export const Customer = () => {
    const [customerData, setCustomerData] = useState()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result=await getAllCustomerApi();
          setCustomerData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
    // console.log(customerData)
    return (
      <OrderTable Customer={true} orderData={customerData}/>
    )
  }
  