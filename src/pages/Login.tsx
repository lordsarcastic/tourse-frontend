import { useFormik } from "formik"
import * as Yup from "yup"
import { Page } from "../types"

const schema = Yup.object().shape({
    usernameEmail: Yup.string(),
    password: Yup.string()
})

const Main = () => {
    const formik = useFormik({
        initialValues: {
            usernameEmail: '',
            password: ''
        },
        onSubmit: (values, { setSubmitting }) => {
            console.log(values)
        },
        validationSchema: schema
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input
                    id="usernameEmail"
                    className={``}
                    {...formik.getFieldProps('usernameEmail')}
                />
                {formik.touched.usernameEmail && formik.errors.usernameEmail
                    ? (<p className="text-red-300 font-bold">{formik.errors.usernameEmail}</p>)
                    : null
                }
            </div>
            <div>
                <input
                    id="password"
                    className={``}
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password
                    ? (<p className="text-red-300 font-bold">{formik.errors.password}</p>)
                    : null
                }
            </div>
        </form>
    )
}

const LoginPage: Page = {
    Component: Main,
    route: '/login'
}

export default LoginPage