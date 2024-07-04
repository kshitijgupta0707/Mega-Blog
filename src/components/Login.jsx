import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth_service'
import { useForm } from 'react-hook-form'
//using the reac-hook-form
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin())
                navigate('/')
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className=' flex items-center justify-center w-full' >

            <div className=' flex items-center justify-center w-full flex-col' >

                <div className=' mb-2 flex justify-center' >
                    <span className=' inline-block w-full max-w-[100px]' >
                        <Logo width='100%' />
                    </span>


                </div>

                <h2 className='  text-center text-2xl font-bold leading-tight ' > Sign in to your account </h2>
                <p className=' mt-2 text-center text-base text-black/60' >
                    Don&apos;t have any account ? &nbsp;
                    <Link to='/signup'
                        className='font-medium text-purple-600 transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>


                {error && <p className=' text-red-600 mt-8 text-center' >
                    {error}
                </p>}


                {/* handlesubmit is  a kind of event */}
                {/* label,
                type = 'text',
                className = "",
                ...props */}
                <form onSubmit={handleSubmit(login)} className=' mt-8' >

                    <div className=' space-y-5' >
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter the email..."
                            //object mein options pass krte hain bhot sre hote hain
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^ ([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address"
                                }
                            })} />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter the password.."
                            {...register("password", {
                                required: true
                            })} />


                            <Button type='submit' className='w-full' >Log in</Button>
                    </div>

                </form>


            </div>


        </div>
    )
}

export default Login