import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../Config/ConfigFirebase'
import { signInWithEmailAndPassword, } from 'firebase/auth';
import { login } from '../../Redux/Action';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const Login = () => {

    const dispatch = useDispatch();
    const [loginValue, setloginValue] = useState({
        emailid: "",
        password: ""
    })

    const [loginError, setloginError] = useState({
        loginError: "",
        passwordError: "",
        validateError: ""
    })

    const [validlogin, setValidlogin] = useState({
        loginValid: false,
        passwordValid: false
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
            setloginValue({ ...loginValue, emailid: e.target.value })
            setloginError({ ...loginError, loginError: "" })
            setValidlogin({ ...validlogin, loginValid: true })
        }

        else {
            setloginError({ ...loginError, loginError: "Incorrect email" })
            setValidlogin({ ...validlogin, loginValid: false })
        }
    }


    //validating password 
    const passwordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setloginError({ ...loginError, passwordError: "Please enter a password" })
            setValidlogin({ ...validlogin, passwordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setloginValue({ ...loginValue, password: e.target.value })
            setloginError({ ...loginError, passwordError: "" })
            setValidlogin({ ...validlogin, passwordValid: true })
        } else if (pwd.length > 15) {
            setloginError({ ...loginError, passwordError: "Password must be 15 character" })
            setValidlogin({ ...validlogin, passwordValid: false })
        } else {
            setloginError({ ...loginError, passwordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit" })
            setValidlogin({ ...validlogin, passwordValid: false })
        }
    }

    //sign in validate
    const validatelogin = async (e) => {
        e.preventDefault();
        if (validlogin.loginValid === true && validlogin.passwordValid === true) {
            setloginError({ ...loginError, validateError: "" })
            try {
                const result = await signInWithEmailAndPassword(auth, loginValue.emailid, loginValue.password)
                console.log(result);
                dispatch(login({
                    email: result.user.email,
                }));
            } catch (err) {
                console.log("Error in login", err)
                setloginError({ ...loginError, validateError: "Invalid Email or password" })
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
                        defaultValue={setloginValue.emailid === "" ? "" : setloginValue.emailid}
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
                        defaultValue={setloginValue.password === "" ? "" : setloginValue.password}
                        onChange={passwordChange}
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
            <p className='login-error'>{loginError.passwordError}</p>
            <button className='login-button' onClick={validatelogin}>
                <div className='btn'>
                    Login
                </div>
            </button>

            <p className='login-error'>{loginError.validateError}</p>
        </div>
    )
}
