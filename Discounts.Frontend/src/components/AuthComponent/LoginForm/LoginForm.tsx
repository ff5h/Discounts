import {useState} from "react";
import styles from "./LoginForm.module.css"
import mail from '../../../images/mail-outline.svg'
import lock from '../../../images/lock-closed-outline.svg'
import unlock from '../../../images/lock-open-outline.svg'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {axiosPublic} from "../../../api/axios";
import { jwtDecode } from 'jwt-decode'

const schema = yup.object({
    email: yup.string().required('Please enter your Email').email('Email is not valid'),
    password: yup.string().required('Please enter your Password').min(8, 'Min length is 8 symbols')
});

interface Props {

}

type UserData = {
    email: string,
    password: string
}


interface Token {
    nameid: string
}
const LoginForm = (props:Props) => {
    const {} = props

    const {
        register, handleSubmit, formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const onSubmit = (data:UserData) => {
        axiosPublic.post<UserData>("http://localhost:8080/api/Account/login", data).then((resp:any) => {
            const {accessToken, refreshToken} = resp.data;
            console.log(resp.data)
            const token:Token = jwtDecode(accessToken);
            localStorage.setItem('userId', token.nameid)
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
        })
    }

    const [isPasswordShown, setPasswordShown] = useState(false)


    const togglePassword = () => {
        setPasswordShown(!isPasswordShown)
    }

    console.log(errors.password?.message)

    return (
        <section>
            <div className={styles.formBox} onClick={e => e.stopPropagation()}>
                <div className={styles.formValue}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Login</h2>
                        <div className={styles.inputBox}>
                            <img src={mail} alt=""/>
                            <input id={'email'} {...register(`email`)}/>
                            <label>Email</label>
                        </div>
                        {errors.email && <label className={styles.errorLabel}>{errors.email?.message}</label>}
                        <div className={styles.inputBox}>
                            <img onClick={togglePassword} src={isPasswordShown ? unlock : lock} alt=""/>
                            <input type={isPasswordShown ? "text" : "password"} id={'password'} {...register(`password`)}/>
                            <label>Password</label>
                        </div>
                        {errors.password && <label className={styles.errorLabel}>{errors.password?.message}</label>}
                        <button className={styles.button}>Log in</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;