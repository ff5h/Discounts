import {ContainerWrapper, InfoWrapper, InsideWrapper, ShopDataWrapper} from "./ProductsComponent.styled";
import shop from "../../images/shop.jpg"
interface Props {
    data: {
        imageUrl: string,
        name: string,
        description: string,
        oldPrice: number,
        newPrice: number,
        categoryName: string,
        promotionId: string
    }
}

export const ProductsComponent = (props: Props) => {
    const {} = props
    return(
        <ContainerWrapper>
            <InsideWrapper>
                <InfoWrapper>
                    <img src={shop} alt=""/>
                    <ShopDataWrapper>
                        <div>
                            <h1>{props.data.name}</h1>
                            <p>{props.data.categoryName}</p>
                        </div>
                        <div>
                            <p>New Price: {props.data.newPrice}</p>
                            <p>Old Price: {props.data.oldPrice}</p>
                            <p>Знижка: {(props.data.oldPrice - props.data.newPrice) * (props.data.oldPrice / 100)}%</p>
                        </div>
                    </ShopDataWrapper>
                    <div>
                        <p>{props.data.description}</p>
                    </div>
                </InfoWrapper>
            </InsideWrapper>
        </ContainerWrapper>
    );
};

export default ProductsComponent