import {
    InfoWrapper,
    PhotoWrapper,
    Wrapper
} from "./CompanyItem.styled";
import logo from "../../images/atb.png";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

interface Props {
    data:{
        id: string,
        name: string,
        imageUrl: string,
        rating: number,
        shopsId: string
    }
}

export const CompanyItem = (props: Props) => {
    const {} = props

    return(
        <Wrapper>
            <PhotoWrapper>
                <img src={logo} alt=""/>
            </PhotoWrapper>
            <InfoWrapper>
                <h1>{props.data.name}</h1>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Rating name="read-only" value={props.data.rating} size={'small'} readOnly />
                </Box>
            </InfoWrapper>
        </Wrapper>
    );
};

export default CompanyItem