import {
    Container,
    InfoWrapper,
    ListWrapper,
    ShopRatingWrapper,
    Wrapper,
    ProductWrapper,
    FilterWrapper
} from "./ShopPage.styled";
import shop from '../../images/shop.jpg'
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import * as React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import DiscountComponent from "../../components/DiscountsComponent/DiscountsComponent";
import ProductsComponent from "../../components/ProductsComponent/ProductsComponent";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosPublic} from "../../api/axios";
import {formatTimestampToHHMM} from "../../utils/utils";

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
    promotions: PromotionType[]
}

type ProductType = {
    imageUrl: string,
    name: string,
    description: string,
    oldPrice: number,
    newPrice: number,
    categoryName: string,
    promotionId: string
}


export const ShopPage = (props: Props) => {
    const {} = props
    const {id} = useParams();
    const [shopData, setShopData] = useState<ShopType>()
    const [value, setValue] = React.useState<number | null>();
    const [productData, setProductData] = useState<ProductType[]>()


    useEffect(() => {
        axiosPublic.get<ShopType>(`http://localhost:8080/api/Shop/${id}`).then((resp:any) => {
            const allPersons = resp.data;
            const formattedShopData = () => ({
                ...allPersons,
                openTime: formatTimestampToHHMM(allPersons.openTime),
                closeTime: formatTimestampToHHMM(allPersons.closeTime),
            })

            setShopData(formattedShopData);
            setValue(allPersons.rating)
        });
    }, [setShopData]);

    const handleOnClickPromotion = (promotionId: string) => {
        axiosPublic.get<ShopType>(`http://localhost:8080/api/Product/promotion/${promotionId}`).then((resp:any) => {
            const products = resp.data;
            setProductData(products)
            console.log(products)
        });
    }

    const [filter, setFilter] = useState('');

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    return(
        <Wrapper>
            <Container>
                <img src={shop} alt=""/>
                <InfoWrapper>
                    <ShopRatingWrapper>
                        <p>{shopData?.name}</p>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating
                                name="simple-controlled"
                                value={value}
                                size="medium"
                                precision={0.5}
                                onChange={(_event, newValue) => {
                                    setValue(newValue);
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
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                    <option value="category">Category</option>
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