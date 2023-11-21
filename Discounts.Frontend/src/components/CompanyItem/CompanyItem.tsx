import {
    InfoWrapper,
    PhotoWrapper,
    Wrapper
} from "./CompanyItem.styled";
import logo from "../../images/atb.png";

interface Props {}

export const CompanyItem = (props: Props) => {
    const {} = props
    return(
        <Wrapper>
            <PhotoWrapper>
                <img src={logo} alt=""/>
            </PhotoWrapper>
            <InfoWrapper>
                <h1>ATB</h1>
                <p>rating</p>
            </InfoWrapper>
        </Wrapper>
    );
};

export default CompanyItem