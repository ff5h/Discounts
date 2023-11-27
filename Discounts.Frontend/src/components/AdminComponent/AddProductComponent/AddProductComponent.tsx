import {ChangeEvent, FormEvent, useState} from "react";
import {axiosPublic} from "../../../api/axios";
import {FormWrapper} from "./AddProductComponent.styled";

interface Props {

}

type InputType = {
    imageUrl: string,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    categoryId: number,
    promotionId: string
}

export const AddProductComponent = (props: Props) => {
    const {} = props

    const [data, setData] = useState({
        imageUrl: '',
        name: '',
        description: '',
        oldPrice: '',
        newPrice: '',
        categoryId: '',
        promotionId: ''
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value)
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productData = {
            name: data.name,
            imageUrl: data.imageUrl,
            description: data.description,
            oldPrice: data.oldPrice,
            newPrice: data.newPrice,
            categoryId: data.categoryId,
            promotionId: data.promotionId
        };
        axiosPublic.post<InputType>("http://localhost:8080/api/Product", productData).then((resp:any) => console.log(resp));
        console.log(productData)
        setData(
            {
                imageUrl: '',
                name: '',
                description: '',
                oldPrice: '',
                newPrice: '',
                categoryId: '',
                promotionId: ''
            }
        )
    };

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Product Name
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="oldPrice">
                    Old Price
                    <input
                        type="number"
                        name="oldPrice"
                        value={data.oldPrice}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="newPrice">
                    New Price
                    <input
                        type="number"
                        name="newPrice"
                        value={data.newPrice}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="categoryId">
                    Category Id
                    <input
                        type="number"
                        name="categoryId"
                        value={data.categoryId}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="promotionId">
                    Promotion Id
                    <input
                        type="text"
                        name="promotionId"
                        value={data.promotionId}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="imageUrl">
                    Image
                    <input
                        type="file"
                        name="imageUrl"
                        value={data.imageUrl}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddProductComponent