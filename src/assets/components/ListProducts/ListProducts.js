import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config/ConfigFirebase';
import "./_listProducts.scss"
import { deleteProductsApi } from '../../../actions/ApiCalls';
export const ListProducts = ({ category, details, setEditId, setEditEnable, setProductData,setDeleteEnable,deleteEnable }) => {
    const handelEdit = (index, id) => {
        setEditEnable(true)
        setProductData(details[index])
        setEditId(id)
    }

    const handelDelete = async (index, id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
            const result = await deleteProductsApi(id)
            setDeleteEnable(!deleteEnable)
            window.alert(result.data+". Click ok to continue")
        }
    }
    return (
        <div className='list-container-wrapper'>
            <div className='list-container-item head'>
                <p className='list-item'>Product Id</p>
                <p className='list-item display4'>Image</p>
                <p className='list-item display3'>Name</p>
                <p className='list-item display5'>Price</p>
                <p className='list-item modify'>Modify</p>
            </div>
            {
                details?.map((product, index) => (
                    <div className='list-container-item' key={index}>
                        <p className='list-item'>{index + 1}</p>
                        <img src={product.thumbnailImage} className='display4' />
                        <p className='list-item display3'>{product.productName}</p>
                        <p className='list-item display5'>{product.productPrice}</p>


                        <div className='list-item modify'>
                            <button onClick={() => { handelEdit(index, product.productId) }} className='edit-btn'>Edit</button>
                            <button onClick={() => { handelDelete(index, product.productId) }} className='delete-btn'>Delete</button>
                        </div>
                    </div>
                )
                )}
        </div>
    )
}
