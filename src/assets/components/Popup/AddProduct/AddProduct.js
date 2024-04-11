import React, { useEffect, useState } from 'react'
import "./_addProduct.scss"
import { db } from "../../../../Config/ConfigFirebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlusCircle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { InputAddProduct } from '../../Buttons/InputAddProduct/InputAddProduct';
import { isEditable } from '@testing-library/user-event/dist/utils';
import { addProductsApi, updateProductsApi } from '../../../../actions/ApiCalls';
export const AddProduct = ({ category, editId, setAddEnable, editEnable, productData, setEditEnable, setProductData }) => {
    const initialState = {
        productId: '',
        productName: '',
        productPrice: 0,
        thumbnailImage: '',
        foodType: category,
        firstImageLink: "",
        secondImageLink: "",
        thirdImageLink: "",
    }
    const [formData, setFormData] = useState(initialState)


    // useEffect(() => {
    //     setFormData(initialState(category));
    // }, [category])

    useEffect(() => {
        if (editEnable) {
            setFormData(productData)
        }
    }, [editEnable])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const validation = (formData?.productId !== '' &&
        formData?.productName !== '' &&
        formData?.productPrice !== 0 &&
        formData?.thumbnailImage !== '')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation) {
            try {
                if (editEnable) {
                    const result=await updateProductsApi(editId,formData)
                    // console.log(result)
                    window.alert(result.data)
                    setEditEnable(false)
                    setProductData([])
                } else {
                    const result=await addProductsApi(formData)
                    // console.log(result)
                    window.alert(result.data)
                    setAddEnable(false)
                }
                setFormData(initialState);

            } catch (error) {
                console.error('Error adding document: ', error);
                alert('An error occurred while submitting the message.');
            }
        } else {
            alert('Fill form fields');
        }
    }
    const commonInput = [
        {
            type: "text",
            name: "productId",
            placeholder: "Product Id",
            value: formData.productId,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "productName",
            placeholder: "Name",
            value: formData.productName,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "thumbnailImage",
            placeholder: "Thumbnail Image",
            value: formData.thumbnailImage,
            handleChange: handleChange
        },
        {
            type: "number",
            name: "productPrice",
            placeholder: "Price",
            value: formData.productPrice,
            handleChange: handleChange
        },
        {
            type: "string",
            name: "firstImageLink",
            placeholder: "First Image Link",
            value: formData.firstImageLink,
            handleChange: handleChange
        },
        {
            type: "string",
            name: "secondImageLink",
            placeholder: "Second Image Link",
            value: formData.secondImageLink,
            handleChange: handleChange
        },
        {
            type: "string",
            name: "thirdImageLink",
            placeholder: "Third Image Link",
            value: formData.thirdImageLink,
            handleChange: handleChange
        },

    ]

    console.log(formData)
    return (
        <div className='add'>
            <p className='add__title'>{category}</p>
            <form className="form" >

                {
                    commonInput.map((input, index) => (
                        <InputAddProduct key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} handleChange={input.handleChange} />
                    ))
                }



                <div className="submit-btn">
                    <button type="submit" className="submit-icon" onClick={handleSubmit}>Submit</button>
                </div>
            </form >
        </div >
    )
}












