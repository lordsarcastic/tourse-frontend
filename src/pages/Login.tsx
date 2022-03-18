import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { AuthContext } from "../Auth"
import { INPUT_STYLE } from "../constants"
import { client } from "../requests"
import { LOGIN } from "../routes"
import { LoginError, Page } from "../types"
import HomePage from "./Home"

const schema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string()
})

const Main = () => {
    const { isLoggedIn, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({} as LoginError);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            setError({} as LoginError)
            client.post(LOGIN, values)
                .then((res) => {
                    res.status === 200 && login(res.data);
                })
                .catch((err) => {
                    console.log(err.response.status)
                    setError({detail: {...err.response.data}.detail})
                    ![401, 200].includes(err.response.status) && setError({
                        detail: "Something went wrong"
                    })
                })
                .finally(() => setSubmitting(false))
        },
        validationSchema: schema
    })

    useEffect(() => {
        isLoggedIn() && navigate(HomePage.route);
    }, [isLoggedIn, navigate])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-black w-1/2 h-full" />
            <div className="w-1/2">
                <div className="flex flex-col gap-y-4 justify-between">
                    <h1 className="text-4xl">Welcome back</h1>
                    <p className="text-slate-500">Welcome back! Please enter your details</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="py-8 flex flex-col gap-y-4 items-center">
                    {error && <p className="text-red-400">{error.detail}</p>}
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-1">
                            <p>Email</p>
                            <input
                                id="email"
                                className={`${INPUT_STYLE}`}
                                placeholder="Enter email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email
                                ? (<p className="text-red-300 font-bold">{formik.errors.email}</p>)
                                : null
                            }
                        </div>
                        <div>
                            <p>Password</p>
                            <input
                                id="password"
                                className={`${INPUT_STYLE}`}
                                placeholder="Password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password
                                ? (<p className="text-red-300 font-bold">{formik.errors.password}</p>)
                                : null
                            }
                        </div>
                    </div>
                    <Link to="/forgot-password">Forgot password</Link>
                    <input
                        type={'submit'}
                        className="bg-black text-white px-8 py-2 rounded-sm w-full hover:cursor-pointer hover:bg-gray-700"
                    />
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up for free</Link></p>
            </div>
        </div>
    )
}

const LoginPage: Page = {
    Component: Main,
    route: '/login'
}

export default LoginPage