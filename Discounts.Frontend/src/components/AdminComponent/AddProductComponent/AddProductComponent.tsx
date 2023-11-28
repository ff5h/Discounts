import {ChangeEvent, FormEvent, useState} from "react";
import {axiosImage, axiosPublic} from "../../../api/axios";
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

interface ImageType {
    image: FormData | null;
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
            axiosImage.post<ImageType>("http://localhost:8080/api/File", formData).then((resp:any) => {
                const productData = {
                    name: data.name,
                    imageUrl: resp.data,
                    description: data.description,
                    oldPrice: data.oldPrice,
                    newPrice: data.newPrice,
                    categoryId: data.categoryId,
                    promotionId: data.promotionId
                };
                axiosPublic.post<InputType>("http://localhost:8080/api/Product", productData).then((resp:any) => console.log(resp));
            })
        }
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
                        onChange={handleChangeFile}
                    />
                </label>
                <button type="submit">Add</button>
            </form>
        </FormWrapper>
    );
}

export default AddProductComponent