import styled from 'styled-components'

interface Props {}

const Footer = (props: Props) => {
  const {} = props

  return <Wrapper>Курсова робота на тему "DISCOUNTS"</Wrapper>
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  padding: 40px;
`

export default Footer
