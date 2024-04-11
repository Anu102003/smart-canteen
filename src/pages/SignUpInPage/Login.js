import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../Config/ConfigFirebase'
import { signInWithEmailAnduserPassword, } from 'firebase/auth';
import { login } from '../../Redux/Action';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginApi, registerApi } from '../../actions/ApiCalls';
export const Login = () => {

    const dispatch = useDispatch();
    const [loginValue, setloginValue] = useState({
        userEmailId: "",
        userPassword: ""
    })

    const [loginError, setloginError] = useState({
        loginError: "",
        userPasswordError: "",
        validateError: ""
    })

    const [validlogin, setValidlogin] = useState({
        loginValid: false,
        userPasswordValid: false
    });

    const [eyeVisible, setEyeVisible] = useState(false)


    //validating sign in value
    const loginChange = (e) => {

        const { value } = e.target;

        if (value === "") {
            setloginError({ ...loginError, loginError: "Please enter a value" })
            setValidlogin({ ...validlogin, loginValid: false })
        }

        //email valid
        else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
            setloginValue({ ...loginValue, userEmailId: e.target.value })
            setloginError({ ...loginError, loginError: "" })
            setValidlogin({ ...validlogin, loginValid: true })
        }

        else {
            setloginError({ ...loginError, loginError: "Incorrect email" })
            setValidlogin({ ...validlogin, loginValid: false })
        }
    }


    //validating userPassword 
    const userPasswordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setloginError({ ...loginError, userPasswordError: "Please enter a Password" })
            setValidlogin({ ...validlogin, userPasswordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setloginValue({ ...loginValue, userPassword: e.target.value })
            setloginError({ ...loginError, userPasswordError: "" })
            setValidlogin({ ...validlogin, userPasswordValid: true })
        } else if (pwd.length > 15) {
            setloginError({ ...loginError, userPasswordError: "Password must be 15 character" })
            setValidlogin({ ...validlogin, userPasswordValid: false })
        } else {
            setloginError({ ...loginError, userPasswordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit" })
            setValidlogin({ ...validlogin, userPasswordValid: false })
        }
    }
    //sign in validate
    const validatelogin = async (e) => {
        e.preventDefault();
        if (validlogin.loginValid === true && validlogin.userPasswordValid === true) {
            setloginError({ ...loginError, validateError: "" })
            try {
                const result = await loginApi(loginValue)
                if(result.data.includes("successful")){
                    dispatch(login({
                    email: loginValue.userEmailId,
                }));
                }else{
                    setloginError({...loginError, validateError: result.data })
                }
                
            } catch (err) {
                console.log("Error in login", err)
                setloginError({ ...loginError, validateError: "Error in login" })
            }
        } else {
            setloginError({ ...loginError, validateError: "Please enter correct data" })
        }
    }
    return (
        <div>
            <div className='headings'>
                Login
            </div>
            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faUser} className='icon' />
                    <input className='login-text'
                        defaultValue={setloginValue.userEmailId === "" ? "" : setloginValue.userEmailId}
                        onChange={loginChange}
                        type='text'
                        placeholder='Email address'
                        autocomplete="false" />
                </div>
            </div>
            <p className='login-error'>{loginError.loginError}</p>

            <div className='fields'>
                <div className='input-field-wrapper'>
                    <FontAwesomeIcon icon={faKey} className='icon' />
                    <input className='login-text'
                        defaultValue={setloginValue.userPassword === "" ? "" : setloginValue.userPassword}
                        onChange={userPasswordChange}
                        type={eyeVisible ? "text" : "password"}
                        placeholder='Password'
                        autocomplete="false" />
                    <div className='eye-icon' onClick={() => setEyeVisible(!eyeVisible)}>
                        {
                            eyeVisible ?
                                <FontAwesomeIcon icon={faEye} /> :
                                <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </div>
                </div>
            </div>
            <p className='login-error'>{loginError.userPasswordError}</p>
            <button className='login-button' onClick={validatelogin}>
                <div className='btn'>
                    Login
                </div>
            </button>

            <p className='login-error'>{loginError.validateError}</p>
        </div>
    )
}
