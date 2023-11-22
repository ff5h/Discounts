import {CarouselWrapper, Container, SubWrapper} from "./CompaniesCatalogPage.styled";
import CompanyItem from "../../components/CompanyItem/CompanyItem";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useEffect, useState} from "react";
import ShopItem from "../../components/ShopItem/ShopItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
interface Props {
}

type CompanyType = {
    id: string,
    name: string,
    imageUrl: string,
    rating: number,
    shopsId: string
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

    const [appState, setAppState] = useState<CompanyType[]>();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        axiosPrivate.get('http://localhost:8080/api/Company').then((resp) => {
            const allPersons = resp.data;
            setAppState(allPersons);
        });
    }, [setAppState]);

    console.log(appState)

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
                        {appState ?

                            appState?.map(company => {
                            return(
                                <CompanyItem data={company}/>
                            )
                        })
                        : <div></div>}
                </Carousel>
            </CarouselWrapper>
            <SubWrapper>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
                <ShopItem/>
            </SubWrapper>
        </Container>
    );
};

export default CompaniesCatalogPage