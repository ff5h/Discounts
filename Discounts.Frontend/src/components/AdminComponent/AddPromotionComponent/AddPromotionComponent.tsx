import {ChangeEvent, FormEvent, useState} from "react";
import {axiosPublic} from "../../../api/axios";
import {FormWrapper} from "./AddPromotionComponent.styled";

interface Props {

}

type InputType = {
    title: string,
    startTime: Date,
    endTime: Date,
    shopId: string
}

export const AddPromotionComponent = (props: Props) => {
    const {} = props

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
            shopId: data.shopId
        };
        axiosPublic.post<InputType>("http://localhost:8080/api/Promotion", companyData).then((resp:any) => console.log(resp));
        console.log(companyData)
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
                        value={data.shopId}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddPromotionComponent