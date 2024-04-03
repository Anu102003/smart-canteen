import React, { useState } from 'react'

import "./_signIn.scss"
import { Login } from './Login';
import { Register } from './Register';
export const LoginPage = () => {
    const [isLogin, setLogin] = useState(true)
    const onChangeLogin = () => {
        isLogin ? setLogin(false) : setLogin(true)
    }

    return (
        <div className='signin'>

            <div className='signin__left'>
                <div className='signin-container'>

                    {
                        isLogin ? <Login /> : <Register setLogin={setLogin} />
                    }
                    <div className='login-sign-option'>
                        {
                            isLogin ?
                                <div className='login-sign'>
                                    Don't have an account ? <span onClick={onChangeLogin} className='sign-text' >Sign up</span>
                                </div> :
                                <div className='login-sign'>
                                    Have an account ? <span onClick={onChangeLogin} className='sign-text'>Sign in</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className='signin__right'>
                <img src=
                    {
                        isLogin ? "https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?t=st=1712140598~exp=1712144198~hmac=36d0530e70a55a986119fa118328bb3b85a46ee143dc19a9d9189480a511cd89&w=740" :
                            "https://img.freepik.com/free-vector/app-installation-illustration-concept_114360-908.jpg?w=740&t=st=1712140756~exp=1712141356~hmac=0b67fe0bbec23d1884143de8334f431b4866bc2d6b9c9bd1e310d99377a95ccf"
                    } />
            </div>
        </div>
    )
}

