import {CarouselWrapper, Container, FilterWrapper, SubWrapper} from "./CompaniesCatalogPage.styled";
import CompanyItem from "../../components/CompanyItem/CompanyItem";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useEffect, useState} from "react";
import ShopItem from "../../components/ShopItem/ShopItem";
import {axiosPublic} from "../../api/axios";
import {formatTimestampToHHMM} from "../../../../Discounts.Frontend/src/utils/utils";
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
    promotionIds: []
}
export const CompaniesCatalogPage = (props: Props) => {
    const {} = props
    const responsive = {superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 8},
        desktop: {breakpoint: { max: 3000, min: 1085 }, items: 5},
        tablet: {breakpoint: { max: 1085, min: 965 }, items: 4},
        mobile: {breakpoint: { max: 965, min: 0 }, items: 3}}

    const [header, setHeader] = useState(false);

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
        axiosPublic.get('http://localhost:8080/api/Company').then((resp) => {
            const allPersons = resp.data;
            setCompanyState(allPersons);
        });
    }, [setCompanyState]);

    const [companyId, setCompanyId] = useState<string | null>('adbfacf4-a7d9-4ea4-92ea-21de5f9f1558');
    const [shopState, setShopState] = useState<ShopType[]>();
    console.log(shopState)
    useEffect(() => {
        axiosPublic.get<ShopType[]>(`http://localhost:8080/api/Shop/${companyId}`).then((resp) => {
            const shopData = resp.data;

            const formattedShopData = shopData.map(shop => ({
                ...shop,
                openTime: formatTimestampToHHMM(shop.openTime),
                closeTime: formatTimestampToHHMM(shop.closeTime),
            }));

            setShopState(formattedShopData);
        });
    }, [companyId])

    const onClickHandler = (id:string) => {
        setCompanyId(id);
    }
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
                                    console.log(company.id)
                                }}>
                                    <CompanyItem data={company}/>
                                </div>
                            )
                        })
                        : <div></div>}
                </Carousel>
            </CarouselWrapper>
            <FilterWrapper>

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