import {ContainerWrapper, InfoWrapper, InsideWrapper, RatingWrapper, ShopDataWrapper} from "./ShopItem.styled";
import shop from '../../images/shop.jpg';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from "@mui/material";
interface Props {
    data:{
        id: string,
        name: string,
        rating: number,
        openTime: string,
        closeTime: string,
        city: string,
        address: string,
        companyId: string,
        promotionIds: []
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        blue: Palette['primary'];
    }

    interface PaletteOptions {
        blue?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        blue: true;
    }
}

const theme = createTheme({
    palette: {
        blue: {
            main: '#435585',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
});


export const ShopItem = (props: Props) => {
    const {} = props
    return(
        <ContainerWrapper>
            <InsideWrapper>
                <InfoWrapper>
                    <div>
                        <img src={shop} alt=""/>
                    </div>
                    <ShopDataWrapper>
                        <h1>{props.data.name}</h1>
                        <p>{`${props.data.openTime} - ${props.data.closeTime}`}</p>
                        <p>{props.data.address}</p>
                    </ShopDataWrapper>
                </InfoWrapper>
                <RatingWrapper>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating name="read-only" value={props.data.rating} readOnly />
                        </Box>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" href="/shop" size="medium" sx={{bgcolor:'blue.main', width: 150, height: 30}}>
                            Детальніше
                        </Button>
                    </ThemeProvider>
                </RatingWrapper>
            </InsideWrapper>
        </ContainerWrapper>
    );
};

export default ShopItem