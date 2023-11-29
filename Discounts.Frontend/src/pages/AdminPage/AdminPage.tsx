import {ButtonWrapper, Container} from "./AdminPage.styled";
import Button from '@mui/material/Button';
import {useState} from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import AddCompanyComponent from "../../components/AdminComponent/AddCompanyComponent/AddCompanyComponent";
import AddProductComponent from "../../components/AdminComponent/AddProductComponent/AddProductComponent";
import AddProductCategoryComponent
    from "../../components/AdminComponent/AddProductCategoryComponent/AddProductCategoryComponent";
import AddPromotionComponent from "../../components/AdminComponent/AddPromotionComponent/AddPromotionComponent";
import AddShopComponent from "../../components/AdminComponent/AddShopComponent/AddShopComponent";
import LoginForm from "../../components/AuthComponent/LoginForm/LoginForm";
// import RegistrationForm from "../../components/AuthComponent/RegistrationForm/RegistrationForm";


interface Props {

}

export const AdminPage = (props: Props) => {
    const {} = props;

    const [addCompanyModal, setAddCompanyModal] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false);
    const [addProductCategoryModal, setAddProductCategoryModal] = useState(false);
    const [addPromotionModal, setAddPromotionModal] = useState(false);
    const [addShopModal, setAddShopModal] = useState(false);
    const [isLoginActive, setLoginActive] = useState(false);

    return(
        <Container>
            <ButtonWrapper>
                <Button onClick={() => setAddCompanyModal(true)} variant="contained">Add Company</Button>
                <Button onClick={() => setAddProductModal(true)} variant="contained">Add Product</Button>
                <Button onClick={() => setAddProductCategoryModal(true)} variant="contained">Add ProductCategory</Button>
                <Button onClick={() => setAddPromotionModal(true)} variant="contained">Add Promotion</Button>
                <Button onClick={() => setAddShopModal(true)} variant="contained">Add Shop</Button>
                <Button onClick={() => setLoginActive(true)} variant="contained">login</Button>
            </ButtonWrapper>
            <ModalComponent active={addCompanyModal} setActive={setAddCompanyModal}>
                <AddCompanyComponent/>
            </ModalComponent>
            <ModalComponent active={addProductModal} setActive={setAddProductModal}>
               <AddProductComponent/>
            </ModalComponent>
            <ModalComponent active={addProductCategoryModal} setActive={setAddProductCategoryModal}>
                <AddProductCategoryComponent/>
            </ModalComponent>
            <ModalComponent active={addPromotionModal} setActive={setAddPromotionModal}>
                <AddPromotionComponent/>
            </ModalComponent>
            <ModalComponent active={addShopModal} setActive={setAddShopModal}>
                <AddShopComponent/>
            </ModalComponent>
            <ModalComponent active={isLoginActive} setActive={setLoginActive}>
                <LoginForm/>
            </ModalComponent>
        </Container>
    );
}

export default AdminPage