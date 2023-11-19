import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth.jsx'
import Layout from './components/Layout.js'
import RegistrationPage from './pages/RegistrationPage.js'
import LoginPage from './pages/LoginPage.js'
import NotFoundPage from './pages/NotFoundPage.js'

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
        </Route>
      </Route>
    </Routes>
  )
}

export default App
