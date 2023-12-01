import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {FormWrapper} from "./AddProductComponent.styled";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAxiosImage from "../../../hooks/useAxiosImage";

interface Props {
    promotions: PromotionType[] | undefined
}

type CategoryType = {
    id: number,
    name: string
}


type PromotionType = {
    id: string,
    title: string,
    startTime: string,
    endTime: string,

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
    const axiosPrivate = useAxiosPrivate()
    const axiosImage = useAxiosImage()
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

    const uniqueCategory = useRef<Array<{
        id: number,
        name: string
    }>>()

    useEffect(() => {
        axiosPrivate.get<CategoryType[]>(`http://localhost:8080/api/ProductCategory`).then((resp:any) => {
            const allPersons:CategoryType[] = resp.data;
            uniqueCategory.current = Array.from(new Set(allPersons?.map(item => ({ id: item.id, name: item.name }))));
        });
    },[])

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
                axiosPrivate.post<InputType>("http://localhost:8080/api/Product", productData).then((resp:any) => console.log(resp));
            })
            handleRefresh()
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

    const handleRefresh = () => {
        window.location.reload();
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
                <select
                    name="categoryId"
                    value={data.categoryId}
                    onChange={(_e) => {
                        const values = _e.target.value;
                        setData({
                            ...data,
                            [_e.target.name]: values
                        });
                    }}
                >
                    <option value="">-- Please Select --</option>
                    {
                        uniqueCategory.current?.map((category, index) => {
                            return(
                                <option key={index} value={`${category.id}`}>{category.name}</option>
                            )
                        })
                    }
                </select>
                </label>
                <label htmlFor="promotionId">
                    Promotion Id
                    <select
                        name="promotionId"
                        value={data.promotionId}
                        onChange={(_e) => {
                            const values = _e.target.value;
                            setData({
                                ...data,
                                [_e.target.name]: values
                            });
                        }
                        }
                    >
                        <option value="">-- Please Select --</option>
                        {
                            props.promotions?.map((promotion, index) => {
                                return(
                                    <option key={index} value={`${promotion.id}`}>{promotion.title}</option>
                                )
                            })
                        }
                    </select>
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