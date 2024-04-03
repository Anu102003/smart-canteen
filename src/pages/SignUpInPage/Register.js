import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { auth } from '../../Config/ConfigFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const Register = ({ setLogin }) => {
    const [registerValue, setregisterValue] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [registerError, setregisterError] = useState({
        emailError: "",
        passwordError: "",
        validateError: "",
        confirmPasswordError: ""
    })
    const [validregister, setValidregister] = useState({
        emailValid: false,
        passwordValid: false,
        confirmPasswordValid: false,
    });
    const [registerEyeVisible, setregisterEyeVisible] = useState(false)
    const [registerEyeVisible2, setregisterEyeVisible2] = useState(false)

    //validating sign in value
    const mobileEmailChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, emailError: "Please enter a value" })
            setValidregister({ ...validregister, emailValid: false })
        }
        //email valid
        else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))) {
            setregisterValue({ ...registerValue, email: e.target.value })
            setregisterError({ ...registerError, emailError: "" })
            setValidregister({ ...validregister, emailValid: true })
        }
        else {
            setregisterError({ ...registerError, emailError: "Please enter a valid email" })
            setValidregister({ ...validregister, emailValid: false })
        }
    }

    //validating password 
    const registerPasswordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setregisterError({ ...registerError, passwordError: "Please enter a password" })
            setValidregister({ ...validregister, passwordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setregisterValue({ ...registerValue, password: e.target.value })
            setregisterError({ ...registerError, passwordError: "" })
            setValidregister({ ...validregister, passwordValid: true })
        } else if (pwd.length > 15) {
            setregisterError({ ...registerError, passwordError: "Password must be 15 character" })
            setValidregister({ ...validregister, passwordValid: false })
        } else {
            setregisterError({ ...registerError, passwordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character  and one digit" })
            setValidregister({ ...validregister, passwordValid: false })
        }
    }
    console.log(registerValue.confirmPassword === registerValue.password)

    //validating confirm password 
    const registerConfirmPasswordChange = (e) => {
        const pwd = e.target.value;
        if (pwd === "") {
            setregisterError({ ...registerError, confirmPasswordError: "Please enter a confirm password" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        } else if (pwd === registerValue.password) {
            setregisterValue({ ...registerValue, confirmPassword: e.target.value })
            setregisterError({ ...registerError, confirmPasswordError: "" })
            setValidregister({ ...validregister, confirmPasswordValid: true })
        } else {
            setregisterError({ ...registerError, confirmPasswordError: "Password mismatch" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        }
    }
    useEffect(() => {
        if (registerValue.confirmPassword === registerValue.password) {
            setregisterError({ ...registerError, confirmPasswordError: "" })
            setValidregister({ ...validregister, confirmPasswordValid: true })
        } else {
            setregisterError({ ...registerError, confirmPasswordError: "Password mismatch" })
            setValidregister({ ...validregister, confirmPasswordValid: false })
        }
    }, [registerValue.confirmPassword, registerValue.password])

    //sign up validate
    const validateregister = async (e) => {
        e.preventDefault();
        if (validregister.emailValid && validregister.passwordValid && validregister.confirmPasswordValid) {
            setregisterError({ ...registerError, validateError: "" })
            try {
                const result = await createUserWithEmailAndPassword(auth, registerValue.email, registerValue.password)
                console.log(result);
                setLogin(true)
            }
            catch (err) {
                console.log("Firebase Error signing in:", err)
                setregisterError({ ...registerError, validateError: "Email already register" })
            };

        } else {
            setregisterError({ ...registerError, validateError: "Please enter correct data" })
        }
    }
    useEffect(() => {
        if (validregister.emailValid && validregister.passwordValid && validregister.confirmPasswordValid) {
            setregisterError({ ...registerError, validateError: "" })
        } else {
            setregisterError({ ...registerError, validateError: "Please enter correct data" })
        }
    }, [validregister.emailValid, validregister.passwordValid, validregister.confirmPasswordValid])
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
                        defaultValue={setregisterValue.email === "" ? "" : setregisterValue.email}
                        onChange={mobileEmailChange}
                        type='text'
                        placeholder='Email address'
                        autocomplete="off" />
                </div>
            </div>
            <p className='login-error'>{registerError.emailError}</p>

            {/* Input field of register value */}
            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faKey} className='icon' />
                    <input className='login-text'
                        defaultValue={setregisterValue.password === "" ? "" : setregisterValue.password}
                        onChange={registerPasswordChange}
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
            <p className='login-error'>{registerError.passwordError}</p>

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
