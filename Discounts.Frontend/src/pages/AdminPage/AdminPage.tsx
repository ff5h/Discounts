import {ButtonWrapper, Container} from "./AdminPage.styled";
import Button from '@mui/material/Button';
import {useState} from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import LoginForm from "../../components/AuthComponent/LoginForm/LoginForm";
// import RegistrationForm from "../../components/AuthComponent/RegistrationForm/RegistrationForm";


interface Props {

}

export const AdminPage = (props: Props) => {
    const {} = props;


    const [isLoginActive, setLoginActive] = useState(false);

    return(
        <Container>
            <ButtonWrapper>
                <Button onClick={() => setLoginActive(true)} variant="contained">login</Button>
            </ButtonWrapper>

            <ModalComponent active={isLoginActive} setActive={setLoginActive}>
                <LoginForm/>
            </ModalComponent>
        </Container>
    );
}

export default AdminPage