import { styled } from 'styled-components'
import Header from './Layout/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer'

interface Props {}

const Layout = (props: Props) => {
  const {} = props

  return (
    <Wrapper>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1 1 auto;
  }
`

export default Layout
