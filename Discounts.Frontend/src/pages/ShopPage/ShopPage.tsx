import {
    Container,
    InfoWrapper,
    ListWrapper,
    ShopRatingWrapper,
    Wrapper,
    ProductWrapper,
    FilterWrapper
} from "./ShopPage.styled";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import * as React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import DiscountComponent from "../../components/DiscountsComponent/DiscountsComponent";
import ProductsComponent from "../../components/ProductsComponent/ProductsComponent";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {formatTimestampToHHMM} from "../../utils/utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
interface Props {}

type PromotionType = {
    id: string,
    title: string,
    startTime: string,
    endTime: string,

}

type ShopType = {
    id: string,
    name: string,
    rating: number,
    openTime: string,
    closeTime: string,
    city: string,
    address: string,
    companyId: string,
    promotions: PromotionType[],
    amountOfVote:number,
    imageUrl: string,
}

type ProductType = {
    imageUrl: string,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    categoryName: string,
    categoryId: string,
    promotionId: string,
    id: string
}

type CategoryType = {
    id: number,
    name: string
}

type VoteType = {
    shopId: string | undefined,
    userId: string | null,
    value: number | null | undefined
}


export const ShopPage = (props: Props) => {
    const {} = props
    const axiosPrivate = useAxiosPrivate()
    const {id} = useParams();
    const [shopData, setShopData] = useState<ShopType>()
    const [value, setValue] = React.useState<number | null | undefined>(shopData?.rating);
    const [productData, setProductData] = useState<ProductType[]>()
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        axiosPrivate.get<ShopType>(`http://localhost:8080/api/Shop/${id}`).then((resp:any) => {
            const allPersons = resp.data;
            const path = resp.data.imageUrl.replace(/\//g, "%2F")
            axiosPrivate.get(`/api/File/${path}`, { responseType: 'arraybuffer' })
                .then((response) => {
                    const blob = new Blob([response.data], { type: 'image/png' });
                    const imageUrl = URL.createObjectURL(blob);
                    setImage(imageUrl);
                })
            const formattedShopData = () => ({
                ...allPersons,
                openTime: formatTimestampToHHMM(allPersons.openTime),
                closeTime: formatTimestampToHHMM(allPersons.closeTime),
                imageUrl: resp.data.imageUrl
            })

            setShopData(formattedShopData);
            setValue(allPersons.rating)
        });
    }, [setShopData]);

    const handleOnClickPromotion = (promotionId: string) => {
        axiosPrivate.get<ProductType[]>(`http://localhost:8080/api/Product/promotion/${promotionId}`).then((resp:any) => {
            const products = resp.data;
            setProductData(products)
        });
    }

    const [filter, setFilter] = useState('');
    const [promId, setPromId] = useState<string>()

    const uniqueCategory = useRef<Array<{
        id: number,
        name: string
    }>>()

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
        console.log(event.target.value)
        axiosPrivate.get<ProductType>(`http://localhost:8080/api/Product/promotion/${promId}/category/${event.target.value}`).then((resp:any) => {
            const allPersons = resp.data;

            setProductData(allPersons);
            console.log(uniqueCategory.current)
        });
    }

    useEffect(() => {
        axiosPrivate.get<CategoryType[]>(`http://localhost:8080/api/ProductCategory`).then((resp:any) => {
            const allPersons:CategoryType[] = resp.data;
            uniqueCategory.current = Array.from(new Set(allPersons?.map(item => ({ id: item.id, name: item.name }))));
        });
    },[])


    const onChangeHandler = (value:number | null) => {
        setValue(value)
        const data:VoteType = {
            shopId: shopData?.id,
            userId: localStorage.getItem('userId'),
            value: value
        }
        axiosPrivate.post<VoteType>(`http://localhost:8080/api/Shop/vote`, data).then();
    }


    return(
        <Wrapper>
            <Container>
                <img src={image} alt=""/>
                <InfoWrapper>
                    <ShopRatingWrapper>
                        <p>{shopData?.name}</p>
                        <h5>{`Кількість голосів: ${shopData?.amountOfVote}`}</h5>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating
                                name="simple-controlled"
                                value={value}
                                size="medium"
                                precision={0.1}
                                onChange={(_event, value) => {
                                    onChangeHandler(value);
                                }}
                            />
                            </Box>
                    </ShopRatingWrapper>
                    <p>{`Графік роботи: ${shopData?.openTime} - ${shopData?.closeTime}`}</p>
                    <p>{`${shopData?.city}, ${shopData?.address}`}</p>
                    <div>
                        <p>Поточні та майбутні акції:</p>
                        <div>
                            <Scrollbars style={{ width: "100%", height: 100 }}>
                                <ListWrapper>
                                    {shopData?.promotions.map((prom, index) => {
                                        return(
                                            <li key={index} onClick={() => {
                                                handleOnClickPromotion(prom.id)
                                                setPromId(prom.id)
                                            }
                                            }>
                                                <DiscountComponent data={prom}/>
                                            </li>
                                        )
                                    })}
                                </ListWrapper>
                            </Scrollbars>
                        </div>
                    </div>
                </InfoWrapper>
            </Container>
            <FilterWrapper>
                <label htmlFor="filter">Filter: </label>
                <select
                    name="filter"
                    value={filter}
                    onChange={handleChangeFilter}
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
            </FilterWrapper>
            <ProductWrapper>
                {productData?.map((product, index) => {
                    console.log(product)
                    return(
                            <ProductsComponent key={index} data={product}/>
                    )
                })}
            </ProductWrapper>
        </Wrapper>
    );
};

export default ShopPage