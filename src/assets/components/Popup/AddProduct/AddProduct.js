import React, { useEffect, useState } from 'react'
import "./_addProduct.scss"
import { db } from "../../../../Config/ConfigFirebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlusCircle, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { InputAddProduct } from '../../Buttons/InputAddProduct/InputAddProduct';
import { isEditable } from '@testing-library/user-event/dist/utils';
export const AddProduct = ({ category, editId, setAddEnable, editEnable, productData, setEditEnable, setProductData }) => {
    const initialState={
        productId: '',
        name:'',
        price:0,
        thumbnail: '',
        images: [{ url: '' }],
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

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const updateImage = [...formData.images]
        updateImage[index] = {
            url: value
        }
        setFormData({
            ...formData,
            images: updateImage
        })
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, { url: '' }]
        }));
    };

    const validation = (formData?.productId !== '' &&
        formData?.name !== '' &&
        formData?.price!== 0 &&
        formData?.thumbnail !== '')

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validation) {
            try {
                const postsCollectionRef = collection(db, `${category.toLowerCase()}`);
                const docRef = editEnable ? doc(db, `${category.toLowerCase()}`, editId) : await addDoc(postsCollectionRef, formData);
                await setDoc(docRef, formData);
                if (editEnable) {
                    window.alert("Edited successfully")
                    setEditEnable(false)
                    setProductData([])
                } else {
                    window.alert("Added successfully")
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
            name: "name",
            placeholder: "Name",
            value: formData.name,
            handleChange: handleChange
        },
        {
            type: "text",
            name: "thumbnail",
            placeholder: "Thumbnail Image",
            value: formData.thumbnail,
            handleChange: handleChange
        },
        {
            type: "number",
            name: "price",
            placeholder: "Price",
            value: formData.price,
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
                <div className='form__fields'>
                    <p>Images </p>:
                    <div className='image-field-wrapper'>
                        {formData.images.map((image, index) => (
                            <div className='image-field' key={index}>
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image.url}
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                            </div>
                        ))}
                        <button className='add-icon' onClick={handleAddImage}>Add Image<FontAwesomeIcon icon={faPlusCircle} /></button>
                    </div>
                </div>

                

                <div className="submit-btn">
                    <button type="submit" className="submit-icon" onClick={handleSubmit}>Submit</button>
                </div>
            </form >
        </div >
    )
}












