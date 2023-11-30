import {ChangeEvent, FormEvent, useState} from "react";
import {FormWrapper} from "./AddShopComponent.styled";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAxiosImage from "../../../hooks/useAxiosImage";

interface Props {

}

type InputType = {
    name: string,
    openTime: string,
    closeTime: string,
    city: string,
    address: string,
    companyId: string,
    imageUrl: string
}

export const AddShopComponent = (props: Props) => {
    const {} = props
    const axiosPrivate = useAxiosPrivate()
    const axiosImage = useAxiosImage()
    const [data, setData] = useState({
        name: '',
        openTime: '',
        closeTime: '',
        city: '',
        address: '',
        imageUrl: '',
        companyId: ''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };


    const [file, setFile] = useState<File | null>(null);

    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        const values = e.target.value;
        setData({
            ...data,
            [e.target.name]: values
        });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            axiosImage.post<InputType>("http://localhost:8080/api/File", formData).then((resp:any) => {
                const shopData = {
                    name: data.name,
                    openTime: new Date(data.openTime).toISOString(),
                    closeTime: new Date(data.closeTime).toISOString(),
                    city: data.city,
                    address: data.address,
                    imageUrl: resp.data,
                    companyId: data.companyId
                };
                console.log(resp.data)
                axiosPrivate.post<InputType>("/api/Shop", shopData).then((resp:any) => console.log(resp));
            })
        }
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
                <label htmlFor="imageUrl">
                    Image
                    <input
                        type="file"
                        name="imageUrl"
                        value={data.imageUrl}
                        onChange={handleChangeFile}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddShopComponent