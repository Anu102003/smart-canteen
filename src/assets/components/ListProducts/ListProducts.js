import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../Config/ConfigFirebase';
import "./_listProducts.scss"
export const ListProducts = ({ category,details, setEditId, setEditEnable, setProductData }) => {
    const handelEdit = (index, id) => {
        setEditEnable(true)
        setProductData(details[index])
        setEditId(id)
    }

    const handelDelete = async (index, id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
            const postsEditCollectionRef = doc(db, `${category.toLowerCase()}`, id);
            await deleteDoc(postsEditCollectionRef);
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
                        <p className='list-item'>{product.productId}</p>
                        <img src={product.thumbnail} className='display4' />
                        <p className='list-item display3'>{product.name}</p>
                        <p className='list-item display5'>{product.price}</p>

                       
                        <div className='list-item modify'>
                            <button onClick={() => { handelEdit(index, product.id) }} className='edit-btn'>Edit</button>
                            <button onClick={() => { handelDelete(index, product.id) }} className='delete-btn'>Delete</button>
                        </div>
                    </div>
                )
                )}
        </div>
    )
}
