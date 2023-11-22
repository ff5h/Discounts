import {Container, InfoWrapper, ListWrapper, ShopRatingWrapper, Wrapper} from "./ShopPage.styled";
import shop from '../../images/shop.jpg'
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import * as React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';
import DiscountComponent from "../../components/DiscountsComponent/DiscountsComponent";

interface Props {}



export const ShopPage = (props: Props) => {
    const {} = props
    const [value, setValue] = React.useState<number | null>(2);

    return(
        <Wrapper>
            <Container>
                <img src={shop} alt=""/>
                <InfoWrapper>
                    <ShopRatingWrapper>
                        <p>ATB</p>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating
                                name="simple-controlled"
                                value={value}
                                size="medium"
                                precision={0.5}
                                onChange={(_event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            </Box>
                    </ShopRatingWrapper>
                    <p>Графік роботи: 7:00 - 22:00</p>
                    <p>м.Львів, вул.Гагаріна 7/2</p>
                    <div>
                        <p>Поточні та майбутні акції:</p>
                        <div>
                            <Scrollbars style={{ width: "100%", height: 100 }}>
                                <ListWrapper>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                    <li>
                                        <DiscountComponent/>
                                    </li>
                                </ListWrapper>
                            </Scrollbars>
                        </div>
                    </div>
                </InfoWrapper>
            </Container>
        </Wrapper>
    );
};

export default ShopPage