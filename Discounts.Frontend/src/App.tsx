import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth.jsx'
import Layout from './components/Layout.js'
import RegistrationPage from './pages/RegistrationPage.js'
import LoginPage from './pages/LoginPage.js'
import NotFoundPage from './pages/NotFoundPage.js'
import CompaniesCatalogPage from "./pages/CompaniesCatalogPage/CompaniesCatalogPage";
import ShopPage from "./pages/ShopPage/ShopPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />

        <Route
          element={<RequireAuth allowedRoles={['customer', 'director']} />}
        >
          <Route path='/test' element={<div>test</div>} />
          <Route path='/companies' element={<CompaniesCatalogPage/>}/>
          <Route path='/shop/:id' element={<ShopPage/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
