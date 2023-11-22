import {CarouselWrapper, Container, SubWrapper} from "./CompaniesCatalogPage.styled";
import CompanyItem from "../../components/CompanyItem/CompanyItem";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useState} from "react";
import ShopItem from "../../components/ShopItem/ShopItem";
interface Props {
}
export const CompaniesCatalogPage = (props: Props) => {
    const {} = props
    const responsive = {superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 8},
        desktop: {breakpoint: { max: 3000, min: 1085 }, items: 6},
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
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
                    <CompanyItem/>
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