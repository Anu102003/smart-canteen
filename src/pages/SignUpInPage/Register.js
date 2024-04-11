import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { auth } from '../../Config/ConfigFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { registerApi } from '../../actions/ApiCalls';

export const Register = ({ setLogin }) => {
    const [registerValue, setregisterValue] = useState({
        userEmailId: "",
        userPassword: "",
        confirmPassword: "",
        userPhoneNumber:0,
        dateOfBirth:"",
        userName:"",
    })
    const [registerError, setregisterError] = useState({
        userEmailIdError: "",
        userPasswordError: "",
        validateError: "",
        confirmPasswordError: "",
        userPhoneNumberError:"",
        dateOfBirthError:"",
        userNameError:"",
    })
    const [validregister, setValidregister] = useState({
        userEmailIdValid: false,
        userPasswordValid: false,
        confirmPasswordValid: false,
        userPhoneNumberValid:false,
        userNameValid:false,
        dateOfBirthValid:false,
    });
    const [registerEyeVisible, setregisterEyeVisible] = useState(false)
    const [registerEyeVisible2, setregisterEyeVisible2] = useState(false)

    //validating sign in value
    const mobileuserEmailIdChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, userEmailIdError: "Please enter a value" })
            setValidregister({ ...validregister, userEmailIdValid: false })
        }
        //userEmailId valid
        else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))) {
            setregisterValue({ ...registerValue, userEmailId: e.target.value })
            setregisterError({ ...registerError, userEmailIdError: "" })
            setValidregister({ ...validregister, userEmailIdValid: true })
        }
        else {
            setregisterError({ ...registerError, userEmailIdError: "Please enter a valid userEmailId" })
            setValidregister({ ...validregister, userEmailIdValid: false })
        }
    }
    //validating userPassword 
    const registeruserPasswordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setregisterError({ ...registerError, userPasswordError: "Please enter a Password" })
            setValidregister({ ...validregister, userPasswordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setregisterValue({ ...registerValue, userPassword: e.target.value })
            setregisterError({ ...registerError, userPasswordError: "" })
            setValidregister({ ...validregister, userPasswordValid: true })
        } else if (pwd.length > 15) {
            setregisterError({ ...registerError, userPasswordError: "Password must be 15 character" })
            setValidregister({ ...validregister, userPasswordValid: false })
        } else {
            setregisterError({ ...registerError, userPasswordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character  and one digit" })
            setValidregister({ ...validregister, userPasswordValid: false })
        }
    }

    //validating confirm password 
    const registerConfirmPasswordChange = (e) => {
        const pwd = e.target.value;
        if (pwd === "") {
            setregisterError({ ...registerError, confirmPasswordError: "Please enter a confirm password" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        } else if (pwd === registerValue.userPassword) {
            setregisterValue({ ...registerValue, confirmPassword: e.target.value })
            setregisterError({ ...registerError, confirmPasswordError: "" })
            setValidregister({ ...validregister, confirmPasswordValid: true })
        } else {
            setregisterError({ ...registerError, confirmPasswordError: "Password mismatch" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        }
    }
    //validating dateOfBirth value
    const dateOfBirthChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, dateOfBirthError: "Please enter a dateOfBirth "})
            setregisterValue({ ...registerValue, dateOfBirth: e.target.value })
            setValidregister({ ...validregister, dateOfBirthValid: false})
        }
        else if (val.length>0) {
            setregisterValue({ ...registerValue, dateOfBirth: e.target.value })
            setregisterError({ ...registerError, dateOfBirthError: "" })
            setValidregister({ ...validregister, dateOfBirthValid: true })
        }
        // else {
        //     setregisterError({ ...registerError, dateOfBirthError: "Please enter a valid userEmailId" })
        // }
    }
    //validating userName value
    const userNameChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, userNameError: "Please enter a userName "})
            setregisterValue({ ...registerValue, userName: e.target.value })
            setValidregister({ ...validregister, userNameValid: false })
        }
        else if (val.length>0) {
            setregisterValue({ ...registerValue, userName: e.target.value })
            setregisterError({ ...registerError, userNameError: "" })
            setValidregister({ ...validregister, userNameValid: true })
        }
        // else {
        //     setregisterError({ ...registerError, dateOfBirthError: "Please enter a valid userEmailId" })
        // }
    }
    //validating userName value
    const userPhoneNumberChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, userPhoneNumberError: "Please enter a phone number "})
        }
        else if (/^[0-9]+$/.test(val)) {
                if (val.length === 10) {
                    setregisterValue({ ...registerValue, userPhoneNumber: e.target.value })
                    setregisterError({ ...registerError, userPhoneNumberError: "" })
                    setValidregister({ ...validregister, userPhoneNumberValid: true })
                } else {
                    setregisterError({ ...registerError, userPhoneNumberError: "Please enter a valid phone number" })
                    setValidregister({ ...validregister, userPhoneNumberValid: false })
                }
        }
        else {
            setregisterError({ ...registerError, userPhoneNumberError: "Please enter a valid phone number" })
        }
    }
    
    useEffect(() => {
        if (registerValue.confirmPassword === registerValue.userPassword) {
            setregisterError({ ...registerError, confirmPasswordError: "" })
            setValidregister({ ...validregister, confirmPasswordValid: true })
        } else {
            setregisterError({ ...registerError, confirmPasswordError: "Password mismatch" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        }
    }, [registerValue.confirmPassword, registerValue.userPassword])

    //sign up validate
    const validateregister = async (e) => {
        e.preventDefault();
        if (validregister.userEmailIdValid && validregister.userPasswordValid && validregister.confirmPasswordValid && 
            validregister.userNameValid && validregister.userPhoneNumberValid && validregister.dateOfBirthValid) {
                setregisterError({ ...registerError, validateError: "" })
            try {
                const result = await registerApi(registerValue)
                // console.log(result);
                if(result.data.includes("successfully")){
                    setLogin(true)
                }else{
                    setregisterError({ ...registerError, validateError: result.data })
                }
            }
            catch (err) {
                console.log("Error in register:", err)
                setregisterError({ ...registerError, validateError: "Error in register" })
            };

        } else {
            setregisterError({ ...registerError, validateError: "Please enter correct data" })
        }
    }
    useEffect(() => {
        if (validregister.userEmailIdValid && validregister.userPasswordValid && validregister.confirmPasswordValid) {
            setregisterError({ ...registerError, validateError: "" })
        } else {
            setregisterError({ ...registerError, validateError: "Please enter correct data" })
        }
    }, [validregister.userEmailIdValid, validregister.userPasswordValid, validregister.confirmPasswordValid])
    return (
        <>
            <div className='headings'>
                Register
            </div>


            {/* Input field of register value */}
            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.userEmailId === "" ? "" : setregisterValue.userEmailId}
                        onChange={mobileuserEmailIdChange}
                        type='text'
                        placeholder='Email address'
                        autocomplete="off" />
                </div>
            </div>
            <p className='login-error'>{registerError.userEmailIdError}</p>

            {/* Input field of register value */}
            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faKey} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.userPassword === "" ? "" : setregisterValue.userPassword}
                        onChange={registeruserPasswordChange}
                        type={registerEyeVisible ? "text" : "password"}
                        placeholder='Password'
                        autocomplete="off" />
                    <div className='eye-icon' onClick={() => setregisterEyeVisible(!registerEyeVisible)}>
                        {
                            registerEyeVisible ?
                                <FontAwesomeIcon icon={faEye} /> :
                                <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </div>
                </div>
            </div>
            <p className='login-error'>{registerError.userPasswordError}</p>


            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faKey} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.confirmPassword === "" ? "" : setregisterValue.confirmPassword}
                        onChange={registerConfirmPasswordChange}
                        type={registerEyeVisible2 ? "text" : "password"}
                        placeholder='Confirm Password'
                        autocomplete="off" />
                    <div className='eye-icon' onClick={() => setregisterEyeVisible2(!registerEyeVisible2)}>
                        {
                            registerEyeVisible2 ?
                                <FontAwesomeIcon icon={faEye} /> :
                                <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </div>
                </div>
            </div>
            <p className='login-error'>{registerError.confirmPasswordError}</p>

            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.dateOfBirth === "" ? "" : setregisterValue.dateOfBirth}
                        onChange={dateOfBirthChange}
                        type='date'
                        placeholder='D-O-B'
                        autocomplete="off" />
                </div>
            </div>
            <p className='login-error'>{registerError.dateOfBirthError}</p>

            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.userPhoneNumber === "" ? "" : setregisterValue.userPhoneNumber}
                        onChange={userPhoneNumberChange}
                        type='tel'
                        placeholder='Phone number'
                        autocomplete="off" />
                </div>
            </div>
            <p className='login-error'>{registerError.userPhoneNumberError}</p>

            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.userName === "" ? "" : setregisterValue.userName}
                        onChange={userNameChange}
                        type='text'
                        placeholder='Username'
                        autocomplete="off" />
                </div>
            </div>
            <p className='login-error'>{registerError.userNameError}</p>

            {/* Sign Up Button */}
            <button className='login-button' onClick={validateregister}>
                <div className='btn'>
                    Register
                </div>
            </button>
            <p className='login-error'>{registerError.validateError}</p>
        </>
    )
}
