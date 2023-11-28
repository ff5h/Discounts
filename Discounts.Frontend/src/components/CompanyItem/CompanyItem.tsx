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
        console.log(props.data.imageUrl)
        axiosPublic.get(`/api/File/${props.data.imageUrl}`).then((resp:any) => {
            const data = resp.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
            setImage('data:image/jpeg;base64,' + base64)
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