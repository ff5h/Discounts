import {ChangeEvent, FormEvent, useState} from "react";
import {axiosPublic} from "../../../api/axios";
import {FormWrapper} from "./AddShopComponent.styled";

interface Props {

}

type InputType = {
    name: string,
    openTime: string,
    closeTime: string,
    city: string,
    address: string,
    companyId: string
}

export const AddShopComponent = (props: Props) => {
    const {} = props

    const [data, setData] = useState({
        name: '',
        openTime: '',
        closeTime: '',
        city: '',
        address: '',
        companyId: ''
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
            name: data.name,
            openTime: new Date(data.openTime).toISOString(),
            closeTime: new Date(data.closeTime).toISOString(),
            city: data.city,
            address: data.address,
            companyId: data.companyId
        };
        axiosPublic.post<InputType>("/api/Shop", companyData).then((resp:any) => console.log(resp));
        console.log(companyData)
    };

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="openTime">
                    Open Time
                    <input
                        type="datetime-local"
                        name="openTime"
                        value={data.openTime}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="closeTime">
                    Close Time
                    <input
                        type="datetime-local"
                        name="closeTime"
                        value={data.closeTime}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="city">
                    City
                    <input
                        type="text"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="address">
                    Address
                    <input
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="companyId">
                    Company Id
                    <input
                        type="text"
                        name="companyId"
                        value={data.companyId}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddShopComponent