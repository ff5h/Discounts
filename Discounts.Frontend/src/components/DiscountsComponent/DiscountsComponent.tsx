import {Container, Wrapper} from "./DiscountsComponent.styled";
import {formatTimestampToUkrainianDate} from "../../utils/utils";

interface Props {
    data:{
        id: string,
        title: string,
        startTime: string,
        endTime: string
    }
}



export const DiscountComponent = (props: Props) => {
    const {} = props

    const startDate = formatTimestampToUkrainianDate(props.data.startTime)
    const endDate = formatTimestampToUkrainianDate(props.data.endTime)

    return(
        <Container>
            <Wrapper>
                <p className={'discount'}>{props.data.title}</p>
            </Wrapper>
            <p className={'date'}>{`${startDate} - ${endDate}`}</p>
        </Container>
    );
};

export default DiscountComponent