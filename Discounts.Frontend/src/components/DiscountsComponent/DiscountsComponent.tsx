import {Container, Wrapper} from "./DiscountsComponent.styled";

interface Props {}



export const DiscountComponent = (props: Props) => {
    const {} = props

    return(
        <Container>
            <Wrapper>
                <p className={'discount'}>Міцні знижки (акція дійсна при наявності товару, тільки з карткою АТБ)</p>
                <p>Почнеться через 3 дні</p>
            </Wrapper>
            <p className={'date'}>24 - 26 Листопада 2023</p>
        </Container>
    );
};

export default DiscountComponent