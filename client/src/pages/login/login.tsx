import { RouteComponentProps } from "react-router-dom";
import { ElementStyleProps } from 'constants/interfaces';
import { loginUser } from "../../actions/authActions";
import { useFormik } from 'formik';
import { loginSchema } from './validation';
import React from 'react';
import logo from 'img/logo/LogoWText.svg'
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import './login_styles.css';
import {useTranslation} from "react-i18next";
import {changeLanguage} from "../../components/side_bar/side_bar";

interface LoginProps extends ElementStyleProps {
};

interface LoginProps extends RouteComponentProps {}

function setUsername(name: string) {
    localStorage.setItem('username', JSON.stringify(name));
}

const Login = (props : LoginProps) => {
    const [errorMessage, setErrorMessage] = React.useState("");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            loginUser(values).then((res: any) => {
                setUsername(res.data.user.name);
                props.history.push("./home");
            }).catch(err => {
                setErrorMessage(i18n.t("signInInvalidLoginCredentials"));
                console.log("error with logging in: ", err);
            });
        },
    });

    const {t, i18n} = useTranslation();

    return(
        <div className={'login '+ (props.classes||'')}>
            <form onSubmit={formik.handleSubmit}>
                <img className="login-logo" src={logo} alt="logo logo"/>

                <h4 className="text-center">{t("signInPleaseSignIn")}</h4>
                <div className="form-floating">
                    <input
                        id="username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                </div>
                {formik.touched.username && formik.errors.username ? (
                    <p className="error">{formik.errors.username}</p>
                ) : null}

                <div className="form-floating">
                    <input
                        id="password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <p className="error">{formik.errors.password}</p>
                ) : null}

                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            {t("signInRememberMe")}
                        </label>
                </div>

                {/*Temporarily link the sign in button directly to the homepage*/}
                <button 
                    className="w-100 btn btn-lg btn-primary"
                    type="submit"
                >{t("signInSignIn")}</button>

                {errorMessage && <div className="error"> {errorMessage} </div>}

                <div className="row mt-5">
                    <div className="col">
                        <button className="w-100 btn btn-lg btn-danger"
                                onClick={changeLanguage("en")}>
                            <i className="bi bi-gear-fill me-2"/>
                            <span className="text text-light">{t("sidebarEnglish")}</span>
                        </button>
                    </div>

                    <div className="col">
                        <button className="w-100 btn btn-lg btn-danger" id="fc"
                                onClick={changeLanguage("fr")}>
                            <i className="bi bi-gear me-2"/>
                            <span className="text text-light">{t("sidebarFrench")}</span>
                        </button>
                    </div>
                </div>


                <label className="mt-3 mb-3 text-muted">&copy; 2021-2022</label>


            </form>



        </div>
    );
}

export default Login;