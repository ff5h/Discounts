import {ButtonWrapper, CarouselWrapper, Container, FilterWrapper, SubWrapper} from "./CompaniesCatalogPage.styled";
import CompanyItem from "../../components/CompanyItem/CompanyItem";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useEffect, useRef, useState} from "react";
import ShopItem from "../../components/ShopItem/ShopItem";
import {formatTimestampToHHMM} from "../../../src/utils/utils";
import * as React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddCompanyComponent from "../../components/AdminComponent/AddCompanyComponent/AddCompanyComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import AddShopComponent from "../../components/AdminComponent/AddShopComponent/AddShopComponent";
import Button from "@mui/material/Button";
interface Props {
}

type CompanyType = {
    id: string,
    name: string,
    imageUrl: string,
    rating: number,
    shopsId: string
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
    promotionIds: [],
    imageUrl: string
}
export const CompaniesCatalogPage = (props: Props) => {
    const {} = props
    const responsive = {superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 8},
        desktop: {breakpoint: { max: 3000, min: 1085 }, items: 5},
        tablet: {breakpoint: { max: 1085, min: 965 }, items: 4},
        mobile: {breakpoint: { max: 965, min: 0 }, items: 3}}

    const [header, setHeader] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const changeHeaderShadow = () => {
        if (window.scrollY >= 30){
            setHeader(true);
        }else {
            setHeader(false);
        }
    };

    window.addEventListener('scroll', changeHeaderShadow);

    const [companyState, setCompanyState] = useState<CompanyType[]>();

    useEffect(() => {
        axiosPrivate.get('http://localhost:8080/api/Company').then((resp:any) => {
            const allPersons = resp.data;
            setCompanyState(allPersons);
        });
    }, [setCompanyState]);

    const [companyId, setCompanyId] = useState<string | null>('');
    const [shopState, setShopState] = useState<ShopType[]>();
    const [state, setState] = useState<boolean>()
    const [compId, setCompID] = useState('');


    useEffect(() => {
        axiosPrivate.get<ShopType[]>(`http://localhost:8080/api/Shop/company/${companyId}`).then((resp:any) => {
            const shopData:ShopType[] = resp.data;

            const formattedShopData = shopData.map((shop:any) => ({
                ...shop,
                openTime: formatTimestampToHHMM(shop.openTime),
                closeTime: formatTimestampToHHMM(shop.closeTime),
            }));

            setShopState(formattedShopData);
            uniqueCities.current = Array.from(new Set(shopData?.map(item => item.city)))
        });
    }, [companyId, state, compId])

    const onClickHandler = (id:string) => {
        setCompanyId(id);
        console.log(id)
    }

    const [filter, setFilter] = useState('');
    const uniqueCities = useRef<Array<string>>()

    const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
        axiosPrivate.get(`http://localhost:8080/api/Shop/company/${companyId}/city/${event.target.value}`).then((resp:any) => {
            const allPersons = resp.data;
            const formattedShopData = allPersons.map((shop:any) => ({
                ...shop,
                openTime: formatTimestampToHHMM(shop.openTime),
                closeTime: formatTimestampToHHMM(shop.closeTime),
            }));

            setShopState(formattedShopData);
        });
    }



    const [addCompanyModal, setAddCompanyModal] = useState(false);
    const [addShopModal, setAddShopModal] = useState(false);

    return(
        <Container>
            <CarouselWrapper>
                <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    containerClass={`${header ? 'out' : 'return'}`}
                    dotListClass=""
                    draggable={true}
                    slidesToSlide={2}
                    focusOnSelect={false}
                    infinite
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}>
                        {companyState ?
                            companyState?.map((company, index) => {
                            return(
                                <div key={index} onClick={() =>{
                                    onClickHandler(company.id)
                                    setCompID(company.id)
                                }}>
                                    <CompanyItem photo={company.imageUrl} active={addShopModal} setActive={setAddShopModal} data={company}/>
                                </div>
                            )
                        })
                        : <div></div>}
                </Carousel>
            </CarouselWrapper>
            {localStorage.getItem('role') == 'admin' ?
                <div>
                    <ButtonWrapper>
                        <Button onClick={() => setAddCompanyModal(!addCompanyModal)} variant="contained">Add Company</Button>
                    </ButtonWrapper>
                    <ModalComponent active={addCompanyModal} setActive={setAddCompanyModal}>
                        <AddCompanyComponent/>
                    </ModalComponent>
                    <ModalComponent active={addShopModal} setActive={setAddShopModal}>
                        <AddShopComponent companyId={compId}/>
                    </ModalComponent>
                </div>
                : <></>}
            <FilterWrapper>
                <label htmlFor="filter">Filter: </label>
                <select
                    name="filter"
                    value={filter}
                    onChange={handleChangeFilter}
                >
                    <option value="">-- Select Country --</option>
                    {uniqueCities.current?.map((city, index) => {
                        return(
                            <option key={index} value={`${city}`}>{city}</option>
                        )
                    })}
                </select>
                <button onClick={() => {
                    setState(!state)
                    setFilter('')
                }
                }>Відмінити</button>
            </FilterWrapper>
            <SubWrapper>
                {
                    shopState ?
                        shopState?.map((shop, index) => {
                            return(
                                <ShopItem key={index} data={shop}/>
                            )
                        })
                        : <div></div>
                }
            </SubWrapper>
        </Container>
    );
};

export default CompaniesCatalogPage