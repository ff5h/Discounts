import {
    InfoWrapper,
    PhotoWrapper,
    Wrapper
} from "./CompanyItem.styled";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const path = props.data.imageUrl.replace(/\//g, "%2F")
        axiosPrivate.get(`/api/File/${path}`, { responseType: 'arraybuffer' })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
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