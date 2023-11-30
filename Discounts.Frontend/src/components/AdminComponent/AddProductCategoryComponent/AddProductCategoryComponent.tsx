import {ChangeEvent, FormEvent, useState} from "react";
import {FormWrapper} from "./AddProductCategoryComponent.styled";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

interface Props {

}

type InputType = {
    name: string
}

export const AddProductCategoryComponent = (props: Props) => {
    const {} = props
    const axiosPrivate = useAxiosPrivate()
    const [data, setData] = useState({
        name: ''
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
        const productCategoryData = {
            name: data.name
        };
        axiosPrivate.post<InputType>("http://localhost:8080/api/ProductCategory", productCategoryData).then((resp:any) => console.log(resp));
        console.log(productCategoryData)
    };

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Product Category Name
                    <input
                        type="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddProductCategoryComponent