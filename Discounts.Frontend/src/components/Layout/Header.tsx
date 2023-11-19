import { styled } from 'styled-components'

interface Props {}

const Header = (props: Props) => {
  const {} = props

  return <Wrapper>Header</Wrapper>
}

const Wrapper = styled.section`
  background-color: green;
  color: white;
  padding: 40px;
`

export default Header
