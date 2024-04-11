import React from 'react'
import "./orderTable.scss"
export const OrderTable = ({ Customer, orderData, order }) => {
    return (
        <div className='order-table'>
            {
                Customer ?
                    <table>
                        <thead>
                            <td>Customer no</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>DOB</td>
                        </thead>
                        <tbody>
                            {orderData?.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.userEmailId}</td>
                                    <td>{item.userPhoneNumber}</td>
                                    <td>{item.dateOfBirth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :
                    <table>
                        <thead>
                            <td>Order no</td>
                            {
                                order &&
                                <td>Email</td>
                            }
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
                                            order &&
                                            <td>{data.userEmailId}</td>
                                        }
                                        <td>
                                            {data.orderProductEntityList.map((e) => (
                                                <>{e.productName}<br></br>
                                                </>
                                            ))}
                                        </td>
                                        <td>
                                            {data.orderProductEntityList.map((e) => (
                                                <>{e.productPrice}<br></br>
                                                </>
                                            ))}
                                        </td>
                                        <td>
                                            {data.orderProductEntityList.map((e) => (
                                                <>{e.productCount}<br></br>
                                                </>
                                            ))}
                                        </td>
                                        <td>{data.totalPrice}</td>
                                        <td>{data.paymentId}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}
