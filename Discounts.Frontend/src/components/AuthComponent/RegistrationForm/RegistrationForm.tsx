import {useState} from "react";
import style from "./RegistrationForm.module.css"
import mail from '../../../images/mail-outline.svg'
import lock from '../../../images/lock-closed-outline.svg'
import unlock from '../../../images/lock-open-outline.svg'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {axiosPublic} from "../../../api/axios";

const withoutSpace= /^\S+$/;

const schema = yup.object({
    email: yup.string().required('Please enter your Email').email('Email is not valid'),
    password: yup.string().required('Please enter your Password')
        .min(8, 'Min length is 8 symbols')
        .matches(withoutSpace, 'Dont use space'),
    confirmPassword: yup.string().required('Please repeat your Password').oneOf([yup.ref('password')],'Wrong password')
});

interface Props {

}

type UserData = {
    email: string,
    password: string,
    confirmPassword: string
}

const RegistrationForm = (props: Props) => {
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
        axiosPublic.post<UserData>("http://localhost:8080/api/Account/register", data).then((resp:any) => console.log(resp));
    }

    const [isPasswordShown, setPasswordShown] = useState(false);
    const [isPasswordRepeatShown, setPasswordRepeatShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!isPasswordShown);
    }

    const togglePasswordRepeat = () => {
        setPasswordRepeatShown(!isPasswordRepeatShown);
    }


    return (
        <section>
            <div className={style.formBox} onClick={e => e.stopPropagation()}>
                <div className={style.formValue}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Registration</h2>
                        <div className={style.inputBox}>
                            <img src={mail} alt=""/>
                            <input id={'email'} {...register(`email`)}/>
                            <label>Email</label>
                        </div>
                        {errors.email && <label className={style.errorLabel}>{errors.email?.message}</label>}
                        <div className={style.inputBox}>
                            <img onClick={togglePassword} src={isPasswordShown ? unlock : lock} alt=""/>
                            <input type={isPasswordShown ? "text" : "password"} id={'password'} {...register(`password`)}/>
                            <label>Password</label>
                        </div>
                        {errors.password && <label className={style.errorLabel}>{errors.password?.message}</label>}
                        <div className={style.inputBox}>
                            <img onClick={togglePasswordRepeat} src={isPasswordRepeatShown ? unlock : lock} alt=""/>
                            <input type={isPasswordRepeatShown ? "text" : "password"} id={'repeatPassword'} {...register(`confirmPassword`)}/>
                            <label>Repeat Password</label>
                        </div>
                        {errors.confirmPassword && <label className={style.errorLabel}>{errors.confirmPassword?.message}</label>}
                        <button className={style.button}>Registration</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegistrationForm;