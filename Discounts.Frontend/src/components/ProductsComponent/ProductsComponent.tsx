import {ContainerWrapper, InfoWrapper, InsideWrapper, ShopDataWrapper} from "./ProductsComponent.styled";
import shop from "../../images/shop.jpg"
interface Props {
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
                            <h1>name</h1>
                            <p>category</p>
                        </div>
                        <div>
                            <p>New Price: new price</p>
                            <p>Old Price: old price</p>
                        </div>
                    </ShopDataWrapper>
                    <div>
                        <p>desc</p>
                    </div>
                </InfoWrapper>
            </InsideWrapper>
        </ContainerWrapper>
    );
};

export default ProductsComponent