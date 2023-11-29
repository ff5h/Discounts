import {
    InfoWrapper,
    PhotoWrapper,
    Wrapper
} from "./CompanyItem.styled";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {axiosPublic} from "../../api/axios";

type Props = {
    data:{
        id: string,
        name: string,
        imageUrl: string,
        rating: number,
        shopsId: string
    }}

export const CompanyItem = (props: Props) => {
    const {} = props

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const path = props.data.imageUrl.replace(/\//g, "%2F")
        axiosPublic.get(`/api/File/${path}`).then((resp:any) => {
            setImage(resp.request.responseURL)
        })

    },[])

    return(
        <Wrapper>
            <PhotoWrapper>
                {image ? <img src={image} alt=""/> : <p>loading</p>}
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