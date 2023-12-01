import {
    ButtonWrapper,
    InfoWrapper,
    PhotoWrapper,
    Wrapper
} from "./CompanyItem.styled";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";

type Props = {
    data:{
        id: string,
        name: string,
        imageUrl: string,
        rating: number,
        shopsId: string
    },
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    photo: string
}

export const CompanyItem = (props: Props) => {
    const {} = props

    const [image, setImage] = useState<string | null>(null);

    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        const path = props.photo.replace(/\//g, "%2F")
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

    const deleteHandler = () => {
        axiosPrivate.delete(`/api/Company`, {params: {
                id: props.data.id,
            }}).then((resp:any) => {
            console.log(resp)
        })
    }


    return(
        <>
            <Wrapper>
                <div className={'flex'}>
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
                </div>
                {localStorage.getItem('role') == 'admin' ?
                    <ButtonWrapper>
                        <Button variant="contained" onClick={() => {
                            deleteHandler();
                        }
                        } size="medium" sx={{bgcolor:'blue.main', width: 150, height: 25}}>
                            Delete
                        </Button>
                        <Button onClick={() => props.setActive(!props.active)} variant="contained" size="medium" sx={{bgcolor:'blue.main', width: 150, height: 25}}>Add Shop</Button>
                    </ButtonWrapper>
                    : <></>}
            </Wrapper>
        </>


    );
};

export default CompanyItem