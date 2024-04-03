import React, { useEffect, useState } from 'react'
import "./orders.scss"
import { db } from '../../../Config/ConfigFirebase';
import { collection, getDocs } from 'firebase/firestore';

export const Orders = () => {
  const [orderData, setOrderData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesCollection = collection(db, `order`);
        const messagesSnapshot = await getDocs(messagesCollection);
        const messagesData = messagesSnapshot.docs.map(doc => (
          {
            id: doc.id,
            ...doc.data()
          }
        ));
        setOrderData(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(orderData)
  return (
    <div className='order-page'>
      <table>
        <thead>
          <td>Order no</td>
          <td>Product Name</td>
          <td>Price Per Quantity</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Payment Id</td>
        </thead>
        <tbody>
          {
            orderData?.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                {
                  data?.data?.length > 0 ?
                    <td>
                      {data?.data?.map((item) => (
                        <div>{item?.name}<br></br></div>
                      ))}
                    </td>
                    :
                    <td>{data?.data?.name}</td>
                }
                {
                  data?.data?.length > 0 ?
                    <td>
                      {data?.data?.map((item) => (
                        <div>{item?.price}<br></br></div>
                      ))}
                    </td>
                    :
                    <td>{data?.data?.price}</td>
                }
                {
                  data?.data?.length > 0 ?
                    <td>
                      {data?.data?.map((item) => (
                        <div>{item?.quantity}<br></br></div>
                      ))}
                    </td>
                    :
                    <td>{data?.data?.quantity}</td>
                }
                {
                  data?.data?.length > 0 ?
                    <td>
                      {data?.data?.reduce((accumulator, currentItem) => {
                        return accumulator + Number(currentItem?.value || 0);
                      }, 0)}
                    </td>
                    :
                    <td>{data?.data?.value}</td>
                }
                <td>{data.paymentId}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
