import {ContainerWrapper, InfoWrapper, InsideWrapper, ShopDataWrapper} from "./ProductsComponent.styled";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Button from "@mui/material/Button";
interface Props {
    data: {
        id:string
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
    const axiosPrivate = useAxiosPrivate()
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        const path = props.data.imageUrl.replace(/\//g, "%2F")
        axiosPrivate.get(`/api/File/${path}`, { responseType: 'arraybuffer' })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
            })

    })
    const deleteHandler = () => {
        console.log(props.data.id)
        axiosPrivate.delete(`/api/Product`, {params: {
                id: props.data.id,
            }}).then((resp:any) => {
            console.log(resp)
        })
    }


    return(
        <ContainerWrapper>
            <InsideWrapper>
                <InfoWrapper>
                    <img src={image} alt=""/>
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
                {localStorage.getItem('role') == 'admin'
                ?<Button variant="contained" onClick={() => {
                        deleteHandler();
                    }
                    } size="medium" sx={{bgcolor:'blue.main', width: 400, height: 30}}>
                        Delete
                    </Button>
                    : <></>
                }
            </InsideWrapper>
        </ContainerWrapper>
    );
};

export default ProductsComponent