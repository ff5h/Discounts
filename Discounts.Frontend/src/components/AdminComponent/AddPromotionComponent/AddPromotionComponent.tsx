import {ChangeEvent, FormEvent, useState} from "react";
import {FormWrapper} from "./AddPromotionComponent.styled";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

interface Props {
    shopId: string | undefined
}

type InputType = {
    title: string,
    startTime: Date,
    endTime: Date,
    shopId: string
}

export const AddPromotionComponent = (props: Props) => {
    const {} = props
    const axiosPrivate = useAxiosPrivate()
    const [data, setData] = useState({
        title: '',
        dateStart: '',
        dateEnd: '',
        shopId: ''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const companyData = {
            title: data.title,
            startTime: new Date(data.dateStart).toISOString(),
            endTime: new Date(data.dateEnd).toISOString(),
            shopId: props.shopId
        };
        axiosPrivate.post<InputType>("http://localhost:8080/api/Promotion", companyData).then((resp:any) => console.log(resp));
    };

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    title
                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="dateStart">
                    Start Date
                    <input
                        type="datetime-local"
                        name="dateStart"
                        value={data.dateStart}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="dateEnd">
                    End Date
                    <input
                        type="datetime-local"
                        name="dateEnd"
                        value={data.dateEnd}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="shopId">
                    Shop Id
                    <input
                        type="text"
                        name="shopId"
                        value={props.shopId}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddPromotionComponent