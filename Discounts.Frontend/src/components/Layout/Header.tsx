import { styled } from 'styled-components'
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';

interface Props {}

const Header = (props: Props) => {
  const {} = props

  return (
      <Wrapper>
        <div>
          <p>
              <Link to={'/companies'}>Discounts</Link>
          </p>
        </div>
        <div>
            <Button variant="contained">AdminPanel</Button>
            <Button variant="contained">Sign Up</Button>
        </div>
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
