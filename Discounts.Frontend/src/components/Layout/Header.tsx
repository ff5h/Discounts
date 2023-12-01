import { styled } from 'styled-components'
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import {useState} from "react";
import LoginForm from "../AuthComponent/LoginForm/LoginForm";
import ModalComponent from "../ModalComponent/ModalComponent";
import RegistrationForm from "../AuthComponent/RegistrationForm/RegistrationForm";
interface Props {}

const Header = (props: Props) => {
  const {} = props

    const [isLoginActive, setLoginActive] = useState(false);
    const [isRegActive, setRegActive] = useState(false);


    return (
      <Wrapper>
        <div>
          <p>
              <Link to={'/companies'}>Discounts</Link>
          </p>
        </div>
          {localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'user'
              ?
              <div>
                <p>You Logined</p>
              </div>
          : <div>
                  <Button variant="contained" onClick={() => {
                      setRegActive(!isRegActive)}
                  }>Registration</Button>
                  <Button variant="contained" onClick={() => {
                      setLoginActive(!isLoginActive)}
                  }>Sign Up</Button>
              </div>}
          <ModalComponent active={isLoginActive} setActive={setLoginActive}>
              <LoginForm/>
          </ModalComponent>
          <ModalComponent active={isRegActive} setActive={setRegActive}>
              <RegistrationForm/>
          </ModalComponent>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #363062;
  color: white;
  padding: 40px;
  div p a{
    text-decoration: none;
    color: #F5E8C7;
    font-size: 1.25rem;
  }
  div button{
    margin: 0 1rem;
  }
`

export default Header
